import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async findByCategory(category: string): Promise<Book[]> {
    return this.bookModel.find({ category }).exec();
  }

  async create(bookData: any): Promise<Book> {
    const newBook = new this.bookModel(bookData);
    return newBook.save();
  }

  async update(id: string, bookData: any): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, bookData, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
