import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Guardrail } from './entities/guardrail.entity';
import { GuardrailsService } from './guardrails.service';
import { GuardrailsResolver } from './guardrails.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Guardrail])],

  providers: [
    GuardrailsResolver, //
    GuardrailsService,
  ],
})
export class GuardrailsModule {}
