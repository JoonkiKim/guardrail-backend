import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Guardrail } from './entities/guardrail.entity';
import { CreateGuardrailInput } from './dto/create-guardrail.input';
import { UpdateGuardrailInput } from './dto/update-guardrail.input';

@Injectable()
export class GuardrailsService {
  constructor(
    @InjectRepository(Guardrail)
    private readonly guardrailsRepository: Repository<Guardrail>,
  ) {}
  // 여러개 조회 -> fetchProducts에 연결
  findAll({ userId }: { userId: string }): Promise<Guardrail[]> {
    return this.guardrailsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne({
    userId,
    guardrailId,
  }: {
    userId: string;
    guardrailId: string;
  }): Promise<Guardrail> {
    const guardrail = await this.guardrailsRepository.findOne({
      where: {
        id: guardrailId,
        user: { id: userId },
      },
    });

    if (!guardrail) {
      throw new NotFoundException(
        '데이터를 찾을 수 없거나 접근 권한이 없습니다.',
      );
    }

    return guardrail;
  }

  create({
    userId,
    createGuardrailInput,
  }: {
    userId: string;
    createGuardrailInput: CreateGuardrailInput;
  }): Promise<Guardrail> {
    return this.guardrailsRepository.save({
      ...createGuardrailInput,
      user: { id: userId },
    });
  }

  async update({
    userId,
    guardrailId,
    updateGuardrailInput,
  }: {
    userId: string;
    guardrailId: string;
    updateGuardrailInput: UpdateGuardrailInput;
  }): Promise<Guardrail> {
    const guardrail = await this.findOne({ userId, guardrailId });

    return this.guardrailsRepository.save({
      ...guardrail,
      ...updateGuardrailInput,
    });
  }

  async delete({
    userId,
    guardrailId,
  }: {
    userId: string;
    guardrailId: string;
  }): Promise<boolean> {
    await this.findOne({ userId, guardrailId });

    const result = await this.guardrailsRepository.softDelete({
      id: guardrailId,
    });

    return result.affected ? true : false;
  }
}
