
import {
  CanActivate, ExecutionContext, Injectable, ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const columnId = +req.params.columnId;
    const col = await this.prisma.column.findUnique({
      where: { id: columnId },
      select: { userId: true },
    });
    if (!col || col.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этой колонке');
    }
    return true;
  }
}
