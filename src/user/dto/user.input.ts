import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User email' })
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'Invalid email',
    },
  )
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field(() => String, { description: 'User password' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'password too weak',
  })
  password: string;
}

export class CreateUserInputResponseDto {
  @Field(() => String, { description: 'User ID' })
  _id: string;

  @Field(() => String, { description: 'User email' })
  email: string;
}


export class GetUserById {
  @Field(() => String, { description: 'User ID' })
  _id: string;
}

export class GetUserByEmail {
  @Field(() => String, { description: 'User email' })
  email: string;
}

export class CurrentUserResponseDto {
  @Field(() => String, { description: 'User ID' })
  _id: string;

  @Field(() => String, { description: 'User email' })
  email: string;
}
