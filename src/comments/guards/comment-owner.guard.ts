
import {
  CanActivate, ExecutionContext, Injectable, ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const commentId = +req.params.commentId;
    const cm = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });
    if (!cm || cm.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этому комментарию');
    }
    return true;
  }
}
