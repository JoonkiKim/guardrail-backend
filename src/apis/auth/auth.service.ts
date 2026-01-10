import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  // IAuthServiceRestoreAccessToken,
  // IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService,
  ) {}

  async login({
    email,
    password,
    context,
  }: // context,
  IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });

    // 5. 일치하는 유저도 있고, 비밀번호도 맞았다면?!
    //    => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }

  // 액세스토큰 '재발급' 함수
  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
    // 액세스 토큰을 만들어주는 함수는 아래에서 만든걸 가져다 쓰면 된다
  }

  // // 리프레시 토큰 발급 함수
  // setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
  //   const refreshToken = this.jwtService.sign(
  //     { sub: user.id },
  //     // 나중에 이런 비밀번호들은 env에 다 빼둬야한다
  //     { secret: process.env.JWT_REFRESH_PASSWORD, expiresIn: '2w' },
  //   );

  //   // 개발환경

  //   // context.res.setHeader(
  //   //   'set-Cookie',
  //   //   `refreshToken=${refreshToken}; path=/;`,
  //   // );

  //   // 개발환경 설정 (localhost 간 통신)
  //   context.res.setHeader(
  //     'set-Cookie',
  //     `refreshToken=${refreshToken}; path=/; HttpOnly; SameSite=Lax; Max-Age=1209600`,
  //   );

  //   // [배포환경에서는 아래와 같이 작성하자]
  //   // domain은 내가 배포할 사이트 주소(앞에 점.을 꼭 붙여줘야한다), 주소가 틀리면 쿠키를 전달 안하게 만들 수 있다
  //   // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
  //   // 누가 사용가능한지 명확하게 지정해주는 부분 -> 뒤쪽에 프론트엔드(브라우저) 주소를 작성해준다
  //   // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  // }
  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_PASSWORD, expiresIn: '2w' },
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // 2주 = 14일 = 1209600초
    const maxAge = 1209600;
    const expiresDate = new Date(Date.now() + maxAge * 1000);
    const expiresString = expiresDate.toUTCString();

    // 쿠키 값 URL 인코딩 (사파리 호환성)
    const encodedToken = encodeURIComponent(refreshToken);

    if (isProduction) {
      // 배포 환경: 크로스 도메인 쿠키 설정
      context.res.setHeader(
        'Set-Cookie', // 대문자로 명시
        `refreshToken=${encodedToken}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${maxAge}; Expires=${expiresString}`,
      );
    } else {
      // 개발 환경: HTTP/HTTPS 모두 지원
      // 사파리에서도 작동하도록 HTTPS 여부 확인
      const req = context.req || (context as any).request;
      const isSecure =
        req?.secure ||
        req?.headers?.['x-forwarded-proto'] === 'https' ||
        req?.protocol === 'https';

      if (isSecure) {
        // HTTPS 환경: Secure 사용 가능
        context.res.setHeader(
          'Set-Cookie',
          `refreshToken=${encodedToken}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${maxAge}; Expires=${expiresString}`,
        );
      } else {
        // HTTP 환경: Secure 없이 SameSite=Lax 사용
        context.res.setHeader(
          'Set-Cookie',
          `refreshToken=${encodedToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Expires=${expiresString}`,
        );
      }
    }

    // 디버깅: 쿠키 헤더 확인
    console.log('쿠키 설정:', context.res.getHeader('Set-Cookie'));
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },

      { secret: process.env.JWT_PASSWORD, expiresIn: '1h' },
    );
  }
}
