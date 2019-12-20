import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StatusService } from './status.service';

@Injectable()
export class StatusInterceptor implements NestInterceptor {
  constructor(private readonly statusStervice: StatusService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    this.statusStervice.incTotalRequests();
    this.statusStervice.incActiveConnections();
    return next
      .handle()
      .pipe(finalize(() => this.statusStervice.decActiveConnections()));
  }
}
