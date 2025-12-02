import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem } from './schemas/cart-item.schema';

@Injectable()
export class CartService {
  private readonly COMMISSION_RATE = 0.10;

  constructor(@InjectModel(CartItem.name) private cartItemModel: Model<CartItem>) {}

  async findByUserId(userId: string): Promise<CartItem[]> {
    return this.cartItemModel.find({ userId }).exec();
  }

  async create(cartItemData: any): Promise<CartItem> {
    const newItem = new this.cartItemModel(cartItemData);
    return newItem.save();
  }

  async updateQuantity(id: string, quantity: number): Promise<CartItem | null> {
    return this.cartItemModel.findByIdAndUpdate(id, { quantity }, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.cartItemModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async calculateTotal(userId: string) {
    const items = await this.findByUserId(userId);

    const subtotal = items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
    const commission = subtotal * this.COMMISSION_RATE;
    const total = subtotal + commission;

    return {
      subtotal,
      commission,
      total,
    };
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartItemModel.deleteMany({ userId }).exec();
  }
}
