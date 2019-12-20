import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Status {
  @Field(() => Int)
  totalRequests: number;

  @Field(() => Int)
  activeConnections: number;
}
