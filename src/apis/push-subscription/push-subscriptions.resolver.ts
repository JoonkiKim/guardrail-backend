// src/apis/push-subscription/push-subscriptions.resolver.ts
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PushSubscription } from './entities/push-subscription.entity';
import { PushSubscriptionsService } from './push-subscriptions.service';
import { CreatePushSubscriptionInput } from './dto/create-push-subscription.input';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';

@Resolver(() => PushSubscription)
export class PushSubscriptionsResolver {
  constructor(
    private readonly pushSubscriptionsService: PushSubscriptionsService,
  ) {}

  @Mutation(() => PushSubscription)
  async createPushSubscription(
    @CurrentUser() user: IAuthUser,
    @Args('input') input: CreatePushSubscriptionInput,
  ): Promise<PushSubscription> {
    return this.pushSubscriptionsService.create(user.id, input);
  }

  @Mutation(() => Boolean)
  async removePushSubscription(
    @CurrentUser() user: IAuthUser,
    @Args('endpoint') endpoint: string,
  ): Promise<boolean> {
    await this.pushSubscriptionsService.removeByEndpoint(user.id, endpoint);
    return true;
  }
}
