import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { PavlovDetail } from './entities/pavlovDetail.entity';

@Injectable()
export class PavlovDetailsService {
  constructor(
    @InjectRepository(PavlovDetail)
    private readonly pavlovDetailRepository: Repository<PavlovDetail>,
  ) {}

  create({ pavlov, ...pavlovDetail }) {
    return this.pavlovDetailRepository.save({
      ...pavlovDetail,
      pavlov: pavlov,
    });
  }

  // 벌크 생성 - 배열을 한 번에 저장
  async bulkCreate(pavlovDetails: any[]): Promise<PavlovDetail[]> {
    return this.pavlovDetailRepository.save(pavlovDetails);
  }

  // 특정 Pavlov에 연결된 모든 PavlovDetails 삭제 (덮어쓰기용)
  async deleteByPavlovId(pavlovId: string): Promise<void> {
    await this.pavlovDetailRepository.delete({
      pavlov: { id: pavlovId },
    });
  }
}
