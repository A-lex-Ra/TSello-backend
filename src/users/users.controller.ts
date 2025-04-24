import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';
import { SameUserGuard } from '../common/guards/same-user.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /*@UseGuards(JwtGuard)
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }*/

  @UseGuards(JwtGuard, SameUserGuard)
  @Get(':userId')
  @ApiBearerAuth()
  findOne(@Param('userId') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtGuard, SameUserGuard)
  @Patch(':userId')
  @ApiBearerAuth()
  update(@Param('userId') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @UseGuards(JwtGuard, SameUserGuard)
  @Delete(':userId')
  @ApiBearerAuth()
  remove(@Param('userId') id: string) {
    return this.usersService.remove(+id);
  }
}
