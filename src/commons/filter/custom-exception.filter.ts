import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { AxiosError } from 'axios';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Chrome DevTools 자동 요청 무시 (.well-known, favicon.ico 등)
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const ignoredPaths = ['.well-known', 'favicon.ico', 'robots.txt'];

    // 루트 경로 GET 요청도 무시 (브라우저 자동 요청)
    if (request?.method === 'GET' && request?.url === '/') {
      return;
    }
    if (
      request?.url &&
      ignoredPaths.some((path) => request.url.includes(path))
    ) {
      return;
    }
    // default 예외
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외가 발생했어요',
      details: null,
    };

    // HTTP 예외일 때 에러 잡아내는 코드
    if (exception instanceof HttpException) {
      error.status = exception.getStatus();

      // ValidationPipe의 상세 에러 메시지 추출
      const response = exception.getResponse();

      if (typeof response === 'object' && 'message' in response) {
        const messages = response['message'];

        // message가 배열이면 (ValidationPipe 에러)
        if (Array.isArray(messages)) {
          // 구조화된 에러 메시지 생성
          const validationErrors = this.parseValidationErrors(messages);
          error.message = validationErrors.summary;
          error.details = validationErrors.details;
        }
        // message가 문자열이면
        else if (typeof messages === 'string') {
          error.message = messages;
        }
        // 그 외의 경우
        else {
          error.message = exception.message;
        }
      } else {
        error.message = exception.message;
      }
    }

    // axios 에러일 때 잡아내는 코드
    if (exception instanceof AxiosError) {
      error.status = exception.response?.status || 500;
      error.message = exception.response?.data?.message || exception.message;
    }

    // 개발 환경에서 상세 에러 로그 출력
    console.log('===== 에러 발생 =====');
    console.log('상태 코드:', error.status);
    console.log('에러 메시지:', error.message);
    if (error.details) {
      console.log('상세 정보:', JSON.stringify(error.details, null, 2));
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('원본 예외:', exception);
    }
    console.log('====================');

    // GraphQL을 위한 ApolloError로 변환
    // details가 있으면 메시지에 포함
    const finalMessage = error.details
      ? JSON.stringify({ message: error.message, errors: error.details })
      : error.message;

    throw new ApolloError(finalMessage, error.status.toString());
  }

  /**
   * ValidationPipe 에러 메시지를 파싱하여 구조화된 형태로 반환
   */
  private parseValidationErrors(messages: string[]): {
    summary: string;
    details: { field: string; errors: string[] }[];
  } {
    const errorMap: Record<string, string[]> = {};

    messages.forEach((msg) => {
      // "fieldName must be..." 형식에서 필드명 추출
      const parts = msg.split(' ');
      const fieldName = parts[0];

      if (!errorMap[fieldName]) {
        errorMap[fieldName] = [];
      }
      errorMap[fieldName].push(msg);
    });

    const details = Object.entries(errorMap).map(([field, errors]) => ({
      field,
      errors,
    }));

    const summary = `입력값 검증 실패: ${details.length}개의 필드에 오류가 있습니다`;

    return { summary, details };
  }
}
