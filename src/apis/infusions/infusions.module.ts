import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Infusion } from './entities/infusion.entity';
import { InfusionsResolver } from './infusions.resolver';
import { InfusionsService } from './infusions.service';
import { InfusionDetail } from '../infusionDetails/entities/infusionDetail.entity';
import { InfusionDetailsService } from '../infusionDetails/infusionDetails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Infusion, InfusionDetail])],

  providers: [
    InfusionsResolver, //
    InfusionsService,
    InfusionDetailsService,
  ],
  exports: [
    InfusionsService, // 추가: 다른 모듈에서 사용할 수 있도록 export
  ],
})
export class InfusionsModule {}
