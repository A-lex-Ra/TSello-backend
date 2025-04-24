
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateColumnDto) {
    return this.prisma.column.create({
      data: { title: dto.title, userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.column.findMany({
      where: { userId },
      include: { cards: {
        orderBy: { order: 'asc' },
      }, },
    });
  }

  async findOne(columnId: number) {
    const col = await this.prisma.column.findFirst({
      where: { id: columnId },
      include: { cards: {
        orderBy: { order: 'asc' },
      }, },
    });
    if (!col) throw new NotFoundException('Колонка не найдена');
    return col;
  }

  async update(columnId: number, dto: UpdateColumnDto) {
    return this.prisma.column.update({
      where: { id: columnId },
      data: dto,
    });
  }

  async remove(columnId: number) {
    await this.prisma.column.delete({ where: { id: columnId } });
    return { deleted: true };
  }
}
