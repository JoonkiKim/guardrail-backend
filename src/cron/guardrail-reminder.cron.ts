// src/cron/guardrail-reminder.cron.ts
import { Injectable } from '@nestjs/common';
import { PushNotificationService } from 'src/commons/push/push-notification.service';
import { UsersService } from 'src/apis/users/users.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class GuardrailReminderCron {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
    private readonly usersService: UsersService, // user별 선호시간 저장돼 있다고 가정
  ) {}

  // 매시간마다 돌면서 현재시간과 일치하는 사용자만 필터링
  @Cron('0 * * * *') // 매 정시
  async handleHourlyCheck() {
    const currentHour = new Date().getHours();
    const targetUsers = await this.usersService.findUsersByReminderHour(
      currentHour,
    );

    await Promise.all(
      targetUsers.map((user) =>
        this.pushNotificationService.sendToUser(user.id, {
          title: 'GuardRail 작성 시간입니다',
          body: `${user.name}님, 오늘의 GuardRail 기록을 남겨주세요.`,
          url: '/guardrail',
        }),
      ),
    );
  }
}
