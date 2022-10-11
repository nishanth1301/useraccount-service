import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Account } from 'src/account/account.schema';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false })
  @Exclude()
  password: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ type: Types.ObjectId, ref: 'Account' })
  account: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
