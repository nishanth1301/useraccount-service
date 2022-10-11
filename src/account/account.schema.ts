import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type AccountDocument = Account & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Account {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  accountname: string;
  @Prop()
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'user' }] })
  members: User[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
