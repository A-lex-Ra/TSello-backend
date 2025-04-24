
import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ColumnOwnerGuard } from './guards/column-owner.guard';

@Module({
  imports: [PrismaModule],
  providers: [ColumnsService, ColumnOwnerGuard],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
