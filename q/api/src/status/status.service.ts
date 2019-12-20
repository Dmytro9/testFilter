import { Injectable } from '@nestjs/common';
import { Status } from './status';

@Injectable()
export class StatusService {
  private readonly status = {
    totalRequests: 0,
    activeConnections: 0,
  };

  get(): Status {
    return this.status;
  }

  incTotalRequests(): void {
    ++this.status.totalRequests;
  }

  incActiveConnections(): void {
    ++this.status.activeConnections;
  }

  decActiveConnections(): void {
    --this.status.activeConnections;
  }
}
