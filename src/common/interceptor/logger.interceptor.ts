import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const req = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = req;

    const now = Date.now();

    // Log incoming request with body, params, query
    this.logger.debug(
      `REQUEST | ${method} ${url} | ${className}.${handlerName} | Body: ${JSON.stringify(
        body,
      )} | Params: ${JSON.stringify(params)} | Query: ${JSON.stringify(query)}`,
    );

    return next.handle().pipe(
      tap((response) => {
        // Success log
        this.logger.log(
          `SUCCESS | ${method} ${url} | ${className}.${handlerName} | Time: ${
            Date.now() - now
          }ms | Response: ${JSON.stringify(response)}`,
        );
      }),
      catchError((err) => {
        // Error log
        this.logger.error(
          `ERROR | ${method} ${url} | ${className}.${handlerName} | Time: ${
            Date.now() - now
          }ms | Message: ${err.message} | Body: ${JSON.stringify(body)} | Params: ${JSON.stringify(
            params,
          )} | Query: ${JSON.stringify(query)}`,
          err.stack,
        );
        return throwError(() => err); // Re-throw the error
      }),
    );
  }
}
