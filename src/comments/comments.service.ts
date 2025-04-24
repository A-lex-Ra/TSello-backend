
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(cardId: number, userId: number, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: { content: dto.content, cardId, userId },
    });
  }

  async findAll(cardId: number) {
    return this.prisma.comment.findMany({
      where: { cardId },
    });
  }

  async findOne(commentId: number) {
    const cm = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!cm) throw new NotFoundException('Комментарий не найден');
    return cm;
  }

  async update(commentId: number, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: dto,
    });
  }

  async remove(commentId: number) {
    await this.prisma.comment.delete({ where: { id: commentId } });
    return { deleted: true };
  }
}
