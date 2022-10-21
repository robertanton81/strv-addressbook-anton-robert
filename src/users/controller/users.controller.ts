import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CatchUniqueConstraintViolation } from '../../common/decorators/catch-unique-constraint-violation.decorator';
import { CatchAll } from '../../common/decorators/try-catch-decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CatchAll((err) => {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  })
  @CatchUniqueConstraintViolation()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
