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
import { HealthController } from './health.controller';

@Module({
  imports: [
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
        // 사파리 호환성을 위한 추가 옵션
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['Set-Cookie'],
      },
      formatError: (error) => {
        console.log('에러 받았다~');
        console.log(error);
        return error;
      }, // 아폴로 에러를 받을 일이 없는경우에는 formatError는 없애줘도 된다
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
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
    // Upstash Redis 연결 설정 (Redis 프로토콜 사용)
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: () => {
        const redisUrl = process.env.REDIS_URL;

        if (!redisUrl) {
          console.warn(
            '⚠️ REDIS_URL이 설정되지 않았습니다. 메모리 캐시를 사용합니다.',
          );
          return {
            ttl: 300,
            max: 100,
          };
        }

        // Upstash는 TLS를 사용하므로 rediss:// 프로토콜 사용
        return {
          store: redisStore as unknown as any, // 타입 단언
          url: redisUrl, // rediss://default:password@endpoint:port 형식

          // 연결 옵션
          socket: {
            // TLS 설정 (Upstash는 TLS 필수)
            tls: true,
            rejectUnauthorized: false, // Upstash 인증서 자동 검증
          },
          // 재시도 설정
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          maxRetriesPerRequest: 3,
          // 연결 실패 시에도 앱이 계속 실행되도록
          enableReadyCheck: false,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuardGlobal, // 전역 Guard 등록
    },
    WebPushInitializer,
  ],
})
export class AppModule {}
