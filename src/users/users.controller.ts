import { Controller,UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuards } from 'src/auth/guards/jwt-guards';

@ApiTags('users-controller')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuards)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuards)
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getuserById(+id);
  }

  @UseGuards(JwtAuthGuards)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuards)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
