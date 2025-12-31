import { Module } from '@nestjs/common';
import { GuardrailReminderCron } from './guardrail-reminder.cron';
import { InfusionAnniversaryCron } from './infusion-reminder.cron';
import { PushNotificationModule } from 'src/commons/push/push-notification.module';
import { UsersModule } from 'src/apis/users/users.module';
import { InfusionsModule } from 'src/apis/infusions/infusions.module';

@Module({
  imports: [
    PushNotificationModule,
    UsersModule,
    InfusionsModule,
  ],
  providers: [GuardrailReminderCron, InfusionAnniversaryCron],
})
export class CronModule {}




