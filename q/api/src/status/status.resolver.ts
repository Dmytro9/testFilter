import { Resolver, Query } from '@nestjs/graphql';
import { Status } from './status';
import { StatusService } from './status.service';
@Resolver()
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Query(() => Status)
  status(): Status {
    return this.statusService.get();
  }
}
