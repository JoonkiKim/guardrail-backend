import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PavlovsService } from './pavlovs.service';

import { CreatePavlovInput } from './dto/create-pavlov.input';
import { UpdatePavlovInput } from './dto/update-pavlov.input';
import { Pavlov } from './entities/pavlov.entity';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';

@Resolver()
export class PavlovsResolver {
  constructor(
    private readonly pavlovsService: PavlovsService, //
  ) {}

  @Query(() => [Pavlov])
  fetchPavlovs(@CurrentUser() user: IAuthUser): Promise<Pavlov[]> {
    return this.pavlovsService.findAll({ userId: user.id });
  }

  @Query(() => Pavlov)
  fetchPavlov(
    @Args('pavlovId') pavlovId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<Pavlov> {
    return this.pavlovsService.findOne({ userId: user.id, pavlovId });
  }

  @Mutation(() => Pavlov)
  createPavlov(
    @Args('createPavlovInput') createPavlovInput: CreatePavlovInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Pavlov> {
    return this.pavlovsService.create({ userId: user.id, createPavlovInput });
  }

  @Mutation(() => Pavlov)
  updatePavlov(
    // 수정API에서는 수정할 상품의 ID와 수정할 내용을 알려줘야된다
    // 이때 수정'할'내용은 하나의 '객체'에 담아서 전달한다 -> CreateProductInput dto에 PartialType을 달아서 상속한 다음에 UpdateProductInput dto를 만들어준다
    @Args('pavlovId') pavlovId: string,
    @Args('updatePavlovInput') updatePavlovInput: UpdatePavlovInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<Pavlov> {
    return this.pavlovsService.update({
      userId: user.id,
      pavlovId,
      updatePavlovInput,
    });
  }

  @Mutation(() => Boolean)
  deletePavlov(
    @Args('pavlovId') pavlovId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<boolean> {
    return this.pavlovsService.delete({ userId: user.id, pavlovId });
  }
}
