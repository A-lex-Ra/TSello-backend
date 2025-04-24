
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CardOwnerGuard } from './guards/card-owner.guard';

@Module({
  imports: [PrismaModule],
  providers: [CardsService, CardOwnerGuard],
  controllers: [CardsController],
})
export class CardsModule {}
