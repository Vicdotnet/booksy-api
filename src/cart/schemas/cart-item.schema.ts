import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'cart_items' })
export class CartItem extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  pricePerUnit: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
