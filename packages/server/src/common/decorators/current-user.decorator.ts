import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, context) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  return user;
});
