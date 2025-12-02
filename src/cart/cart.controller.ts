import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // obtener items del carrito
  @Get('user/:userId')
  async getCartItems(@Param('userId') userId: string) {
    return this.cartService.findByUserId(userId);
  }

  // agregar item al carrito
  @Post()
  async addToCart(@Body() cartItemData: any) {
    return this.cartService.create(cartItemData);
  }

  // actualizar cantidad
  @Put(':id')
  async updateCartItem(@Param('id') id: string, @Body() body: { quantity: number }) {
    const item = await this.cartService.updateQuantity(id, body.quantity);
    if (!item) {
      throw new HttpException('item no encontrado', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  // eliminar item
  @Delete(':id')
  async deleteCartItem(@Param('id') id: string) {
    const result = await this.cartService.delete(id);
    if (!result) {
      throw new HttpException('item no encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'item eliminado' };
  }

  // calcular total con comision
  @Get('total/:userId')
  async getCartTotal(@Param('userId') userId: string) {
    return this.cartService.calculateTotal(userId);
  }

  // limpiar carrito
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    await this.cartService.clearCart(userId);
    return { message: 'carrito limpiado' };
  }
}
