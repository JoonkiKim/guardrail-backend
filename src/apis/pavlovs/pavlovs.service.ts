import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Pavlov } from './entities/pavlov.entity';
import { PavlovDetailsService } from '../pavlovDetails/pavlovDetails.service';
import { CreatePavlovInput } from './dto/create-pavlov.input';
import { UpdatePavlovInput } from './dto/update-pavlov.input';

@Injectable()
export class PavlovsService {
  constructor(
    @InjectRepository(Pavlov)
    private readonly pavlovsRepository: Repository<Pavlov>,
    private readonly pavlovDetailsService: PavlovDetailsService,
  ) {}
  // 여러개 조회 -> fetchProducts에 연결
  findAll({ userId }: { userId: string }): Promise<Pavlov[]> {
    return this.pavlovsRepository.find({
      where: { user: { id: userId } },
      relations: ['pavlovDetails'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne({
    userId,
    pavlovId,
  }: {
    userId: string;
    pavlovId: string;
  }): Promise<Pavlov> {
    const pavlov = await this.pavlovsRepository.findOne({
      where: {
        id: pavlovId,
        user: { id: userId },
      },
      relations: ['pavlovDetails'],
    });

    if (!pavlov) {
      throw new NotFoundException(
        '데이터를 찾을 수 없거나 접근 권한이 없습니다.',
      );
    }

    return pavlov;
  }

  async create({
    userId,
    createPavlovInput,
  }: {
    userId: string;
    createPavlovInput: CreatePavlovInput;
  }): Promise<Pavlov> {
    const { pavlovDetails, ...pavlov } = createPavlovInput;

    // Pavlov 먼저 생성
    const pavlovResult = await this.pavlovsRepository.save({
      ...pavlov,
      user: { id: userId },
    });

    let pavlovDetailsResult = [];

    // pavlovDetails가 있으면 한 번에 생성
    if (pavlovDetails && pavlovDetails.length > 0) {
      const detailsWithPavlov = pavlovDetails.map((detail) => ({
        ...detail,
        pavlov: pavlovResult,
      }));

      pavlovDetailsResult = await this.pavlovDetailsService.bulkCreate(
        detailsWithPavlov,
      );
    }

    // 생성된 PavlovDetails를 Pavlov에 연결
    pavlovResult.pavlovDetails = pavlovDetailsResult;

    return pavlovResult;
  }

  async update({
    userId,
    pavlovId,
    updatePavlovInput,
  }: {
    userId: string;
    pavlovId: string;
    updatePavlovInput: UpdatePavlovInput;
  }): Promise<Pavlov> {
    const pavlov = await this.findOne({ userId, pavlovId });

    const { pavlovDetails, ...pavlovData } = updatePavlovInput;

    // Pavlov 기본 정보 업데이트
    const updatedPavlov = await this.pavlovsRepository.save({
      ...pavlov,
      ...pavlovData,
    });

    let pavlovDetailsResult = [];

    // pavlovDetails가 있으면 처리 (덮어쓰기 방식)
    if (pavlovDetails && pavlovDetails.length > 0) {
      // 기존 PavlovDetails 삭제
      await this.pavlovDetailsService.deleteByPavlovId(pavlovId);

      // 새로운 PavlovDetails 한 번에 생성
      const detailsWithPavlov = pavlovDetails.map((detail) => ({
        ...detail,
        pavlov: updatedPavlov,
      }));

      pavlovDetailsResult = await this.pavlovDetailsService.bulkCreate(
        detailsWithPavlov,
      );
    } else {
      // pavlovDetails가 없으면 기존 것들 유지
      pavlovDetailsResult = pavlov.pavlovDetails || [];
    }

    // 최종 결과 반환
    updatedPavlov.pavlovDetails = pavlovDetailsResult;
    return updatedPavlov;
  }

  async delete({
    userId,
    pavlovId,
  }: {
    userId: string;
    pavlovId: string;
  }): Promise<boolean> {
    await this.findOne({ userId, pavlovId });

    const result = await this.pavlovsRepository.softDelete({
      id: pavlovId,
    });

    return result.affected ? true : false;
  }
}
