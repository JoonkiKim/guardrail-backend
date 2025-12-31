import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Infusion } from './entities/infusion.entity';
import { InfusionDetailsService } from '../infusionDetails/infusionDetails.service';
import { CreateInfusionInput } from './dto/create-infusion.input';
import { UpdateInfusionInput } from './dto/update-infusion.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InfusionsService {
  constructor(
    @InjectRepository(Infusion)
    private readonly infusionsRepository: Repository<Infusion>,
    private readonly infusionDetailsService: InfusionDetailsService, //
  ) {}

  // [다른 테이블과 조인해서 데이터 조회하는 방법]
  findAll({ userId }: { userId: string }): Promise<Infusion[]> {
    return this.infusionsRepository.find({
      where: { user: { id: userId } },
      relations: ['infusionDetails'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne({
    userId,
    infusionId,
  }: {
    userId: string;
    infusionId: string;
  }): Promise<Infusion> {
    const infusion = await this.infusionsRepository.findOne({
      where: {
        id: infusionId,
        user: { id: userId },
      },
      relations: ['infusionDetails'],
    });

    if (!infusion) {
      throw new NotFoundException(
        '데이터를 찾을 수 없거나 접근 권한이 없습니다.',
      );
    }

    return infusion;
  }

  // create 메서드는 infusionDetail을 배열로 처리하도록 수정 필요
  async create({
    userId,
    createInfusionInput,
  }: {
    userId: string;
    createInfusionInput: CreateInfusionInput;
  }): Promise<Infusion> {
    const { infusionDetails, ...infusion } = createInfusionInput;

    // Infusion 먼저 생성
    const infusionResult = await this.infusionsRepository.save({
      ...infusion,
      user: { id: userId },
    });

    let infusionDetailsResult = [];

    // infusionDetails가 있으면 한 번에 생성
    if (infusionDetails && infusionDetails.length > 0) {
      const detailsWithInfusion = infusionDetails.map((detail) => ({
        ...detail,
        infusion: infusionResult,
      }));

      infusionDetailsResult = await this.infusionDetailsService.bulkCreate(
        detailsWithInfusion,
      );
    }

    // 생성된 InfusionDetails를 Infusion에 연결
    infusionResult.infusionDetails = infusionDetailsResult;

    return infusionResult;
  }

  async update({
    userId,
    infusionId,
    updateInfusionInput,
  }: {
    userId: string;
    infusionId: string;
    updateInfusionInput: UpdateInfusionInput;
  }): Promise<Infusion> {
    const infusion = await this.findOne({ userId, infusionId });

    // updateInfusionInput에서 infusionDetails 분리
    const { infusionDetails, ...infusionData } = updateInfusionInput;

    // Infusion 기본 정보 업데이트
    const updatedInfusion = await this.infusionsRepository.save({
      ...infusion,
      ...infusionData,
    });

    let infusionDetailsResult = [];

    // infusionDetails가 있으면 처리
    if (infusionDetails && infusionDetails.length > 0) {
      // 기존 InfusionDetails 삭제
      await this.infusionDetailsService.deleteByInfusionId(infusionId);

      // 새로운 InfusionDetails 한 번에 생성
      const detailsWithInfusion = infusionDetails.map((detail) => ({
        ...detail,
        infusion: updatedInfusion,
      }));

      infusionDetailsResult = await this.infusionDetailsService.bulkCreate(
        detailsWithInfusion,
      );
    } else {
      // 기존 것들 유지
      infusionDetailsResult = infusion.infusionDetails || [];
    }

    // 최종 결과 반환
    updatedInfusion.infusionDetails = infusionDetailsResult;
    return updatedInfusion;
  }

  async delete({
    userId,
    infusionId,
  }: {
    userId: string;
    infusionId: string;
  }): Promise<boolean> {
    await this.findOne({ userId, infusionId });

    // 1. 먼저 연결된 InfusionDetails soft delete
    await this.infusionDetailsService.softDeleteByInfusionId(infusionId);

    // 2. Infusion soft delete
    const result = await this.infusionsRepository.softDelete({
      id: infusionId,
    });

    return result.affected ? true : false;
  }

  async findAnniversaryInfusions(
    targetDate: Date,
  ): Promise<Array<{ infusion: Infusion; user: User; milestone: string }>> {
    const qb = this.infusionsRepository
      .createQueryBuilder('infusion')
      .leftJoinAndSelect('infusion.user', 'user')
      .where('infusion.deletedAt IS NULL')
      .andWhere('user.pushNotificationEnabled = :enabled', { enabled: true });
    // 오늘 날짜 기준으로 7일, 30일, 365일, 3650일 전에 생성된 담금주 찾기
    const oneWeekAgo = new Date(targetDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date(targetDate);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const oneYearAgo = new Date(targetDate);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    const tenYearsAgo = new Date(targetDate);
    tenYearsAgo.setDate(tenYearsAgo.getDate() - 3650);

    // DATE() 함수로 날짜만 비교 (시간 제외)
    qb.andWhere(
      `DATE(infusion.createdAt) = DATE(:oneWeek) OR 
     DATE(infusion.createdAt) = DATE(:oneMonth) OR 
     DATE(infusion.createdAt) = DATE(:oneYear) OR 
     DATE(infusion.createdAt) = DATE(:tenYears)`,
      {
        oneWeek: oneWeekAgo,
        oneMonth: oneMonthAgo,
        oneYear: oneYearAgo,
        tenYears: tenYearsAgo,
      },
    );

    const infusions = await qb.getMany();

    return infusions.map((infusion) => {
      const diffDays = Math.floor(
        (targetDate.getTime() - infusion.createdAt.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      let milestone = '';
      if (diffDays === 7) milestone = '1주';
      else if (diffDays === 30) milestone = '1달';
      else if (diffDays === 365) milestone = '1년';
      else if (diffDays === 3650) milestone = '10년';

      return {
        infusion,
        user: infusion.user,
        milestone,
      };
    });
  }
}
