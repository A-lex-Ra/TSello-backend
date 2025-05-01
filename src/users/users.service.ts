import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashed },
    });
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // async findAll() {
  //   return this.prisma.user.findMany();
  // }

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('Не найден');
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async update(userId: number, dto: UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.update({ where: { id: userId }, data: dto });
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async remove(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { deleted: true };
  }
}
