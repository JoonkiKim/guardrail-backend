import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InfusionsService } from './infusions.service';

import { CreateInfusionInput } from './dto/create-infusion.input';
import { UpdateInfusionInput } from './dto/update-infusion.input';
import { Infusion } from './entities/infusion.entity';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';

@Resolver()
export class InfusionsResolver {
  constructor(
    private readonly infusionsService: InfusionsService, //
  ) {}

  @Query(() => [Infusion])
  fetchInfusions(@CurrentUser() user: IAuthUser): Promise<Infusion[]> {
    return this.infusionsService.findAll({ userId: user.id });
  }

  @Query(() => Infusion)
  fetchInfusion(
    @Args('infusionId') infusionId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<Infusion> {
    return this.infusionsService.findOne({ userId: user.id, infusionId });
  }

  @Mutation(() => Infusion)
  createInfusion(
    @Args('createInfusionInput') createInfusionInput: CreateInfusionInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Infusion> {
    return this.infusionsService.create({
      userId: user.id,
      createInfusionInput,
    });
  }

  @Mutation(() => Infusion)
  updateInfusion(
    @Args('infusionId') infusionId: string,
    @Args('updateInfusionInput') updateInfusionInput: UpdateInfusionInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Infusion> {
    return this.infusionsService.update({
      userId: user.id,
      infusionId,
      updateInfusionInput,
    });
  }

  @Mutation(() => Boolean)
  deleteInfusion(
    @Args('infusionId') infusionId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<boolean> {
    return this.infusionsService.delete({ userId: user.id, infusionId });
  }
}
