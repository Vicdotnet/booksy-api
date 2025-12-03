import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async createUser(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = this.jwtService.sign({
      sub: savedUser._id,
      email: savedUser.email
    });

    return { user: savedUser, token };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email
    });

    return { user, token };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}