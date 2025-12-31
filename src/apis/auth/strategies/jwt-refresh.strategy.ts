// 리프레시토큰을 인가해주기 위한 stratey 클래스를 만들어보자
// Bearer에서 가져오는게 아니라 쿠키에서 리프레시토큰을 뽑아오고 그걸 검증해야된다
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      // ✅ 쿠키 제대로 파싱하기
      jwtFromRequest: (req) => {
        console.log('===== 쿠키 수신 =====');
        const cookieHeader = req.headers.cookie;
        console.log('전체 쿠키:', cookieHeader);

        if (!cookieHeader) {
          console.log('⚠️ 쿠키가 없습니다!');
          return null;
        }

        // 쿠키 문자열을 파싱하여 객체로 변환
        const cookies = cookieHeader.split(';').reduce((acc, part) => {
          const [key, value] = part.trim().split('=');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>);

        const refreshToken = cookies['refreshToken'];
        console.log('추출된 refreshToken:', refreshToken ? '존재함' : '없음');
        console.log('====================');

        return refreshToken || null;
      },
      secretOrKey: process.env.JWT_REFRESH_PASSWORD,
      passReqToCallback: true,
    });
  }

  // 위의 리프레시를 지나서 통과하면 밑으로 가고 req.user생생되어서 그게 req에 담겨서 들어가게 되고 -> 그거로 accessToken을 재발급받는다

  async validate(req: any, payload: any) {
    // req.get('cookie')는 string | undefined
    const cookieHeader = req.get('cookie') ?? '';
    const cookies = cookieHeader.split(';').reduce((acc, part) => {
      const [k, v] = part.trim().split('=');
      if (k && v) acc[k] = v;
      return acc;
    }, {} as Record<string, string>);

    const refreshToken = cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 존재하지 않습니다.');
    }

    // 2) Redis에 블랙리스트된 키 전체로 조회
    const blacklisted = await this.cacheManager.get<string>(
      `refreshToken:${refreshToken}`,
    );
    if (blacklisted) {
      // 키가 존재하면 이미 로그아웃된 토큰
      throw new UnauthorizedException('이미 로그아웃된 리프레시 토큰입니다.');
    }

    return { id: payload.sub };
  }
}
