import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushSubscription } from './entities/push-subscription.entity';
import { PushSubscriptionsService } from './push-subscriptions.service';
import { PushSubscriptionsResolver } from './push-subscriptions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PushSubscription])],
  providers: [PushSubscriptionsService, PushSubscriptionsResolver],
  exports: [PushSubscriptionsService],
})
export class PushSubscriptionsModule {}
