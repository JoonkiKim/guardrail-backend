// src/commons/push/web-push.config.ts
import * as webpush from 'web-push';
import { PushSubscription } from 'src/apis/push-subscription/entities/push-subscription.entity';

const DEFAULT_VAPID_SUBJECT = 'https://guardrail-fawn.vercel.app/';

export const configureWebPush = () => {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT ?? DEFAULT_VAPID_SUBJECT;

  if (!publicKey || !privateKey) {
    throw new Error('VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must be set.');
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
};

export const sendPushNotification = async (
  subscription: PushSubscription,
  payload: Record<string, unknown>,
) => {
  await webpush.sendNotification(
    {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime
        ? Number(subscription.expirationTime)
        : undefined,
      keys: subscription.keys,
    },
    JSON.stringify(payload),
  );
};
