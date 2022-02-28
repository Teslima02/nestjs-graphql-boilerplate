import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  @Prop({ type: String, required: true })
  email: string;

  @Prop()
  password: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
