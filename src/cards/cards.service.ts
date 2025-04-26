
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(columnId: number, dto: CreateCardDto) {
    let desiredOrder: number;
    if (dto.order != null) {
      desiredOrder = dto.order
      await this.freePlaceFor(columnId, desiredOrder)
    } else {
      // Получаем максимальный order в колонке
      const lastCard = await this.prisma.card.findFirst({
        where: { columnId },
        orderBy: { order: 'desc' },
      });

      desiredOrder = lastCard?.order != null ? lastCard.order + 10 : 0;
    }
    // 4. Добавляем новую карточку
    return this.prisma.card.create({
      data: {
        ...dto,
        order: desiredOrder,
        columnId,
      },
    });
  }

  async findAll(columnId: number) {
    return this.prisma.card.findMany({
      where: { columnId },
      include: { comments: {
        orderBy: { createdAt: 'desc' }, 
      }, },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(cardId: number) {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
      include: { comments: {
        orderBy: { createdAt: 'desc' }, 
      }, },
    });
    if (!card) throw new NotFoundException('Карточка не найдена');
    return card;
  }

  async update(cardId: number, dto: UpdateCardDto) {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    });
    if (!card) throw new NotFoundException('Карточка не найдена');

    if (dto.order != null) {
      await this.freePlaceFor(dto.columnId ?? card.columnId, dto.order)
    }
    console.log("card update: №" + cardId +" card dto: "+dto.checked+" "+dto.title+" "+dto.description+" "+dto.order+" "+dto.columnId);
    
    return this.prisma.card.update({
      where: { id: cardId },
      data: dto,
    })
  }

  async remove(cardId: number) {
    await this.prisma.card.delete({ where: { id: cardId } });
    return { deleted: true };
  }

  async freePlaceFor(columnId: number, desiredOrder: number) {
    // 1. Проверим, занят ли desired order
    const existingCard = await this.prisma.card.findFirst({
      where: {
        columnId,
        order: desiredOrder,
      },
    });
  
    if (existingCard) {
      await this.prisma.card.updateMany({
        where: {
          columnId,
          order: {
            gte: desiredOrder,
          },
        },
        data: {
          order: { increment: 1 },
        },
      })
    }
  }
}
