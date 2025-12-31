import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InfusionDetail } from './entities/infusionDetail.entity';

@Injectable()
export class InfusionDetailsService {
  // product테이블에서 Repository의존성 주입받는 것과 동일하게 여기서도 ProductSaleslocation으로 Repository의존성 주입받아서 테이블에 저장한다음에 그 결과값을 productsSaleslocationsService통해서 product테이블에 보내준다
  constructor(
    @InjectRepository(InfusionDetail)
    private readonly infusionDetailRepository: Repository<InfusionDetail>,
  ) {}

  create({ infusion, ...infusionDetail }) {
    return this.infusionDetailRepository.save({
      ...infusionDetail,
      infusion: infusion, // Infusion과 연결
    });
  }

  // 벌크 생성 - 배열을 한 번에 저장
  async bulkCreate(infusionDetails: any[]): Promise<InfusionDetail[]> {
    return this.infusionDetailRepository.save(infusionDetails);
  }

  async update({
    infusionDetailId,
    updateInfusionDetailInput,
  }: {
    infusionDetailId: string;
    updateInfusionDetailInput: any;
  }) {
    const infusionDetail = await this.infusionDetailRepository.findOne({
      where: { id: infusionDetailId },
    });

    return this.infusionDetailRepository.save({
      ...infusionDetail,
      ...updateInfusionDetailInput,
    });
  }

  async deleteByInfusionId(infusionId: string) {
    return this.infusionDetailRepository.delete({
      infusion: { id: infusionId },
    });
  }

  // 특정 Infusion에 연결된 모든 InfusionDetails soft delete
  async softDeleteByInfusionId(infusionId: string) {
    return this.infusionDetailRepository.softDelete({
      infusion: { id: infusionId },
    });
  }
}
