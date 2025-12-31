import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/commons/decorators/public.decorator';

@Injectable()
export class GqlAuthGuardGlobal extends AuthGuard('access') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    // ✅ HTTP 요청이면 HTTP req
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    // ✅ GraphQL 요청이면 GraphQL req
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    // ✅ Render Health Check 예외 처리
    const req = this.getRequest(context);
    const url = req?.url ?? req?.originalUrl ?? '';
    if (url === '/healthz' || url.startsWith('/healthz')) {
      return true;
    }

    // 기존 Public 데코레이터 로직 유지
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context) as any;
  }
}

// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { IS_PUBLIC_KEY } from 'src/commons/decorators/public.decorator';

// @Injectable()
// export class GqlAuthGuardGlobal extends AuthGuard('access') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }

//   canActivate(context: ExecutionContext) {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (isPublic) {
//       return true;
//     }

//     return super.canActivate(context);
//   }
// }
