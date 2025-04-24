
import {
  Controller, Post, Get, Patch, Delete,
  Param, Body, UseGuards, ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ColumnOwnerGuard } from './guards/column-owner.guard';
import { SameUserGuard } from '../common/guards/same-user.guard';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Columns')
@ApiParam({ name: 'userId', type: 'string' })
@UseGuards(JwtGuard, SameUserGuard)
@ApiBearerAuth()
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private colsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать колонку' })
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.colsService.create(+userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список колонок пользователя' })
  findAll(
    @Param('userId') userId: string,
  ) {
    return this.colsService.findAll(+userId);
  }

  @Get(':columnId')
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Получить одну колонку' })
  findOne(
    @Param('columnId') columnId: string,
  ) {
    return this.colsService.findOne(+columnId);
  }

  @Patch(':columnId')
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Обновить колонку' })
  update(
    @Param('columnId') columnId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.colsService.update(+columnId, dto);
  }

  @Delete(':columnId')
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Удалить колонку' })
  remove(@Param('columnId') columnId: string) {
    return this.colsService.remove(+columnId);
  }
}
