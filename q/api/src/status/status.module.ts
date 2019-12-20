import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusInterceptor } from './status.interceptor';
import { StatusResolver } from './status.resolver';

@Module({
  providers: [StatusService, StatusInterceptor, StatusResolver],
  controllers: [StatusController],
  exports: [StatusService, StatusInterceptor],
})
export class StatusModule {}
