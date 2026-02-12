// jwt-access.strategy.ts

import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PASSWORD,
      passReqToCallback: true,
    });
  }

  // ② 첫 번째 인자에 req, 두 번째에 payload가 들어옵니다.
  async validate(req: Request, payload: any) {
    console.log('===== Access Token 검증 시작 =====');
    console.log('요청 URL:', req.url || (req as any).originalUrl);
    console.log('요청 Method:', req.method);
    
    // 1) 헤더에서 Bearer 토큰만 추출
    const authHeader = req.headers['authorization'] ?? '';
    console.log('Authorization 헤더:', authHeader ? `${authHeader.substring(0, 50)}...` : '없음');
    console.log('Authorization 헤더 전체:', authHeader);
    
    const token = authHeader.replace('Bearer ', '').trim();
    console.log('추출된 토큰:', token ? `${token.substring(0, 50)}... (길이: ${token.length})` : '없음');
    
    if (!token) {
      console.error('❌ 토큰이 없습니다!');
      console.log('요청 헤더 전체:', JSON.stringify(req.headers, null, 2));
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    // 2) Redis에 해당 토큰이 로그아웃 처리되어 저장되어 있는지 확인
    //    key 전체를 "accessToken:<token>" 형태로 조회해야 합니다.
    const isLoggedOut = await this.cacheManager.get<string>(
      `accessToken:${token}`,
    );
    console.log('로그아웃 여부:', isLoggedOut ? '로그아웃됨' : '정상');
    
    if (isLoggedOut) {
      console.error('❌ 이미 로그아웃된 액세스 토큰입니다.');
      throw new UnauthorizedException('이미 로그아웃된 액세스 토큰입니다.');
    }

    // 3) 유효한 토큰이라면 payload에서 user 정보(id 등)를 꺼내 반환
    console.log('✅ 토큰 검증 성공, User ID:', payload.sub);
    console.log('Payload 전체:', JSON.stringify(payload, null, 2));
    console.log('=====================================');
    
    return { id: payload.sub };
  }
}
