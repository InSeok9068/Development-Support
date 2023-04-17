import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug(createRequestLogging(request));

    return next.handle();
  }
}

const createRequestLogging = (request: any): string => {
  if (request) {
    const method = request.method;
    const url = request.url;
    return `${method} ${url} \n ${request.body} \n ${request.params} \n ${request.query}`;
  }
};
