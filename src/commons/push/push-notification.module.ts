import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushSubscriptionsModule } from 'src/apis/push-subscription/push-subscriptions.module';

@Module({
  imports: [PushSubscriptionsModule],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
