import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new HttpException('libro no encontrado', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  @Get('category/:category')
  async getBooksByCategory(@Param('category') category: string) {
    return this.booksService.findByCategory(category);
  }

  @Post()
  async createBook(@Body() bookData: any) {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookData: any) {
    const book = await this.booksService.update(id, bookData);
    if (!book) {
      throw new HttpException('libro no encontrado', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    const result = await this.booksService.delete(id);
    if (!result) {
      throw new HttpException('libro no encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'libro eliminado' };
  }
}