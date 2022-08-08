/**
 * built-in and third party dependencies
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

/**
 * services
 */
import { UsersService } from '../services/users.service';

/**
 * dtos
 */
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * responses
 */
import { UserResponseDto } from '../dtos/responses/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'User creation' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserResponseDto,
  })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'User list' })
  @ApiOkResponse({
    description: 'User list',
    type: UserResponseDto,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }
}
