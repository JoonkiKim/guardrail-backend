import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PavlovDetailsService } from '../pavlovDetails/pavlovDetails.service';
import { Pavlov } from './entities/pavlov.entity';
import { PavlovDetail } from '../pavlovDetails/entities/pavlovDetail.entity';
import { PavlovsResolver } from './pavlovs.resolver';
import { PavlovsService } from './pavlovs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pavlov, PavlovDetail])],

  providers: [
    PavlovsResolver, //
    PavlovsService,
    PavlovDetailsService,
  ],
})
export class PavlovsModule {}
