
import {
  Controller, Post, Get, Patch, Delete,
  Param, Body, UseGuards, ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ColumnOwnerGuard } from '../columns/guards/column-owner.guard';
import { CardOwnerGuard } from './guards/card-owner.guard';
import { SameUserGuard } from '../common/guards/same-user.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Cards')
@ApiParam({ name: 'userId', type: 'string' })
@ApiParam({ name: 'columnId', type: 'string' })
@UseGuards(JwtGuard, SameUserGuard)
@ApiBearerAuth()
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Создать карточку' })
  create(
    @Param('columnId') columnId: string,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardsService.create(+columnId, dto);
  }

  @Get()
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Список карточек в колонке' })
  findAll(@Param('columnId') columnId: string) {
    return this.cardsService.findAll(+columnId);
  }

  @Get(':cardId')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Получить одну карточку' })
  findOne(@Param('cardId') cardId: string) {
    return this.cardsService.findOne(+cardId);
  }

  @Patch(':cardId')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Обновить карточку' })
  update(
    @Param('cardId') cardId: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardsService.update(+cardId, dto);
  }

  @Delete(':cardId')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Удалить карточку' })
  remove(@Param('cardId') cardId: string) {
    return this.cardsService.remove(+cardId);
  }
}
