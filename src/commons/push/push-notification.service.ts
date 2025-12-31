// src/commons/push/push-notification.service.ts
import { Injectable } from '@nestjs/common';
import { PushSubscriptionsService } from 'src/apis/push-subscription/push-subscriptions.service';
import { sendPushNotification } from './web-push.config';

@Injectable()
export class PushNotificationService {
  constructor(
    private readonly pushSubscriptionsService: PushSubscriptionsService,
  ) {}

  async sendToUser(userId: string, payload: Record<string, unknown>) {
    const subscriptions = await this.pushSubscriptionsService.findAllByUserId(
      userId,
    );

    await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          await sendPushNotification(subscription, payload);
        } catch (error) {
          // 실패 로그 + 필요시 구독 삭제는 sendPushNotification 내부에서 처리
        }
      }),
    );
  }

  async broadcast(payload: Record<string, unknown>) {
    const subscriptions = await this.pushSubscriptionsService.findAll();
    await Promise.all(
      subscriptions.map((subscription) =>
        sendPushNotification(subscription, payload),
      ),
    );
  }
}
