
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentOwnerGuard } from './guards/comment-owner.guard';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentOwnerGuard],
  controllers: [CommentsController],
})
export class CommentsModule {}
