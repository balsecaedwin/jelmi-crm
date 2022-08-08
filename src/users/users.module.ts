/**
 * built-in and third party dependencies
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * controllers
 */
import { UsersController } from './controllers/users.controller';

/**
 * services
 */
import { UsersService } from './services/users.service';

/**
 * entities
 */
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
