import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GuardrailsService } from './guardrails.service';

import { Guardrail } from './entities/guardrail.entity';
import { CreateGuardrailInput } from './dto/create-guardrail.input';
import { UpdateGuardrailInput } from './dto/update-guardrail.input';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';

@Resolver()
export class GuardrailsResolver {
  constructor(
    private readonly guardrailsService: GuardrailsService, //
  ) {}

  @Query(() => [Guardrail])
  fetchGuardrails(@CurrentUser() user: IAuthUser): Promise<Guardrail[]> {
    return this.guardrailsService.findAll({ userId: user.id });
  }

  @Query(() => Guardrail)
  fetchGuardrail(
    @Args('guardrailId') guardrailId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<Guardrail> {
    return this.guardrailsService.findOne({ userId: user.id, guardrailId });
  }

  @Mutation(() => Guardrail)
  createGuardrail(
    @Args('createGuardrailInput') createGuardrailInput: CreateGuardrailInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Guardrail> {
    return this.guardrailsService.create({
      userId: user.id,
      createGuardrailInput,
    });
  }

  @Mutation(() => Guardrail)
  updateGuardrail(
    // 수정API에서는 수정할 상품의 ID와 수정할 내용을 알려줘야된다
    // 이때 수정'할'내용은 하나의 '객체'에 담아서 전달한다 -> CreateProductInput dto에 PartialType을 달아서 상속한 다음에 UpdateProductInput dto를 만들어준다
    @Args('guardrailId') guardrailId: string,
    @Args('updateGuardrailInput') updateGuardrailInput: UpdateGuardrailInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Guardrail> {
    return this.guardrailsService.update({
      userId: user.id,
      guardrailId,
      updateGuardrailInput,
    });
  }

  @Mutation(() => Boolean)
  deleteGuardrail(
    @Args('guardrailId') guardrailId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<boolean> {
    return this.guardrailsService.delete({ userId: user.id, guardrailId });
  }
}
