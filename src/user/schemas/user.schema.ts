import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
  @Prop()
  email: String;

  @Prop()
  password: String;

  @Prop()
  name: String;

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);