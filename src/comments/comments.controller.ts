
import {
  Controller, Post, Get, Patch, Delete,
  Param, Body, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ColumnOwnerGuard } from '../columns/guards/column-owner.guard';
import { CardOwnerGuard } from '../cards/guards/card-owner.guard';
import { CommentOwnerGuard } from './guards/comment-owner.guard';
import { SameUserGuard } from '../common/guards/same-user.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@ApiParam({ name: 'cardId', type: 'string' })
@ApiParam({ name: 'columnId', type: 'string' })
@ApiParam({ name: 'userId', type: 'string' })
@UseGuards(JwtGuard, SameUserGuard)
@ApiBearerAuth()
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(ColumnOwnerGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'Добавить комментарий к карточке' })
  create(
    @Param('cardId') cardId: string,
    @GetUser() user,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(+cardId, user.id, dto);
  }

  @Get()
  @UseGuards(ColumnOwnerGuard, CardOwnerGuard)
  @ApiOperation({ summary: 'Список комментариев у карточки' })
  findAll(@Param('cardId') cardId: string) {
    return this.commentsService.findAll(+cardId);
  }

  @Get(':commentId')
  @UseGuards(CommentOwnerGuard)
  @ApiOperation({ summary: 'Получить один комментарий' })
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(+commentId);
  }

  @Patch(':commentId')
  @UseGuards(CommentOwnerGuard)
  @ApiOperation({ summary: 'Обновить комментарий' })
  update(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+commentId, dto);
  }

  @Delete(':commentId')
  @UseGuards(CommentOwnerGuard)
  @ApiOperation({ summary: 'Удалить комментарий' })
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(+commentId);
  }
}
