import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logMessageStart = `Start... method : ${
      context.getHandler().name
    }, exec time: `;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            '\x1b[34m%s\x1b[0m',
            `${logMessageStart} ${
              Date.now() - now
            }ms timestamp ${new Date().toISOString()}`,
          ),
        ),
      );
  }
}
