import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InfusionsService } from 'src/apis/infusions/infusions.service';
import { PushNotificationService } from 'src/commons/push/push-notification.service';

// src/cron/infusion-anniversary.cron.ts
@Injectable()
export class InfusionAnniversaryCron {
  constructor(
    private readonly infusionsService: InfusionsService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Cron('0 9 * * *') // 매일 오전 8시
  async handleDailyAnniversary() {
    const today = new Date();

    const targets = await this.infusionsService.findAnniversaryInfusions(today);
    // findAnniversaryInfusions는 아래처럼 날짜 조건(7일/30일/365일 등)을 체크해주는 쿼리

    await Promise.all(
      targets.map(({ infusion, user, milestone }) =>
        this.pushNotificationService.sendToUser(user.id, {
          title: `담금주 ${milestone} 알림`,
          body: `${infusion.title}이(가) 담근 지 ${milestone} 됐어요.`,
          url: `/infusions/${infusion.id}`,
        }),
      ),
    );
  }
}
