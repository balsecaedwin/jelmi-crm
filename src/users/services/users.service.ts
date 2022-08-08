/**
 * built-in and third party dependencies
 */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**
 * entities
 */
import { User } from '../entities/user.entity';

/**
 * dtos
 */
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.findOneByPhoneNumber(data.phone);

    if (user) {
      throw new ConflictException(
        `User with phone number ${data.phone} already exists`,
      );
    }

    const newUser = new this.userModel(data);
    return newUser.save();
  }

  findOneByPhoneNumber(phone: number): Promise<User> {
    return this.userModel.findOne({ phone }).exec();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
