import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class SameUserGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    const paramId = +req.params.userId;
    if (user.id !== paramId) {
      throw new ForbiddenException('Нет доступа к ресурсам другого пользователя');
    }
    return true;
  }
}
