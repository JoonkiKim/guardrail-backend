// auth.resolver.ts

import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { Public } from 'src/commons/decorators/public.decorator';
import { getCookieValue } from 'src/commons/utils/cookie.util';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Public()
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ email, password, context });
  }

  // //리스토어함수에서 해줘야할일
  // // 1. 리프레시토큰 인가  -> 2. 액세스토큰 재발급
  @Public()
  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  restoreAccessToken(@Context() context: IContext): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }

  //
  // 로그아웃 구조
  // 우선 로그아웃을 하고 싶은 유저가 액세스토큰이랑 리프레시토큰을 서버에 전달하면 그게 유효한건지부터 체크 -> 유효하다면 그 토큰들을 redis에 저장해놓음으로써 로그아웃블랙리스트에 올려놓음 -> 해당 유저가 블랙리스트에 있는 토큰으로 요청을 하면 튕김 + 토큰이 만료되면 redis에서도 토큰이 없어지는데 이게 문제가 안되는 이유는 토큰이 어 차 피 만료되었으니까 요청을 해도 그냥 튕기는거임

  @Mutation(() => String)
  async logout(@Context() context: IContext): Promise<string> {
    const { req } = context;
    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : undefined;
    // 쿠키에서 리프레시토큰 가져오기 (통일된 파싱 함수 사용)
    const cookieHeader = req.headers.cookie;
    const refreshToken = getCookieValue(cookieHeader, 'refreshToken');

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    let decodedAT: any;
    let decodedRT: any;

    try {
      decodedAT = jwt.verify(accessToken, process.env.JWT_PASSWORD);
      decodedRT = jwt.verify(refreshToken, process.env.JWT_REFRESH_PASSWORD);
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }

    // exp는 UNIX timestamp (초 단위) 로 반환됩니다.
    // 현재 시각(nowSec)과 만료 시각(accessExp)의 차이를 구해야만 Redis 에서 정확한 TTL을 설정할 수 있어요.
    const nowSec = Math.floor(Date.now() / 1000);

    const accessExp = decodedAT.exp as number;
    const refreshExp = decodedRT.exp as number;
    console.log(accessExp);

    console.log(refreshExp);
    const accessTTL = accessExp > nowSec ? accessExp - nowSec : 0;
    const refreshTTL = refreshExp > nowSec ? refreshExp - nowSec : 0;
    console.log(accessTTL);

    console.log(refreshTTL);
    // Redis에 블랙리스트용으로 저장
    // key자리에 토큰을 넣는패턴은 흔하다!
    try {
      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: accessTTL,
      });

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: refreshTTL,
        },
      );
    } catch (err) {
      console.log(err);
    }

    // console.log('accessLogout', accessLogout);
    // console.log('refreshLogout', refreshLogout);

    return '로그아웃에 성공했습니다.';
  }
}
