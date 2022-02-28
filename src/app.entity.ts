import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class App {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  ingredients: string[];
}
