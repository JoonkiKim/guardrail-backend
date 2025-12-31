import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './apis/users/users.module';

import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { GuardrailsModule } from './apis/guardrails/guardrails.module';
import { InfusionsModule } from './apis/infusions/infusions.module';
import { TodosModule } from './apis/todos/todos.module';
import { PavlovsModule } from './apis/pavlovs/pavlovs.module';
import { AuthModule } from './apis/auth/auth.module';
import { GqlAuthGuardGlobal } from './apis/auth/guards/gql-auth-global.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { WebPushInitializer } from './commons/push/web-push.initializer';
import { CronModule } from './cron/cron.module';
import { PushSubscriptionsModule } from './apis/push-subscription/push-subscriptions.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GuardrailsModule,
    InfusionsModule,
    TodosModule,
    PavlovsModule,
    CronModule,
    PushSubscriptionsModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: [
          'http://localhost:3000', // 개발 환경
          'https://guardrail-fawn.vercel.app', // 프로덕션 환경
        ],
        credentials: true,
      },
      formatError: (error) => {
        console.log('에러 받았다~');
        console.log(error);
        return error;
      }, // 아폴로 에러를 받을 일이 없는경우에는 formatError는 없애줘도 된다
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,

      database: process.env.DATABASE_DATABASE,

      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    // CacheModule.registerAsync({ isGlobal: true, useClass: CacheConfigService }), // 여기서 isGlobal: true를 설정해주면, 전역에서 캐시를 사용할 수 있게 된다!
    CacheModule.register<RedisClientOptions>({
      // 추가
      store: redisStore as unknown as any, // 타입 단언
      url: process.env.REDIS_URL || 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuardGlobal, // 전역 Guard 등록
    },
    WebPushInitializer,
  ],
})
export class AppModule {}
