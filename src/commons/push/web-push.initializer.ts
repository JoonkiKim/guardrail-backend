import { Injectable, OnModuleInit } from '@nestjs/common';
import { configureWebPush } from './web-push.config';

@Injectable()
export class WebPushInitializer implements OnModuleInit {
  onModuleInit() {
    configureWebPush();
  }
}
