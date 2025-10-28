import { Body, Controller, Delete, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JWT_SECURITY } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/user-role.decorator';
import { UpdateCriteriaDto } from './dto/update-criteria.dto';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/criteria')
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Get notification criteria for a user',
    description:
      'Get the critera (councils/meeting updates) that determines when a user will receive a notification',
  })
  async getUserNotificationCriteria(@CurrentUser() user: User): Promise<string[]> {
    const usr = await this.usersService.getUser(user.email, true);
    return usr.councils;
  }

  @Put('/criteria')
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Update notification criteria for a user',
    description:
      'Set the critera (councils/meeting updates) that determines when a user will receive a notification',
  })
  updateUserNotificationCriteria(
    @CurrentUser() user: User,
    @Body() criteria: UpdateCriteriaDto,
  ): Promise<User> {
    return this.usersService.updateUserNotificationCriteria(user, criteria);
  }

  @Delete('/me')
  @ApiSecurity(JWT_SECURITY)
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Delete current user',
    description: 'Allows a user to delete themselves',
  })
  deleteSelf(@CurrentUser() user: User): Promise<User> {
    return this.usersService.deleteUser(user.email);
  }

  @Delete()
  @Roles(UserRole.MODERATOR)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Allows a moderator to delete a user',
  })
  deleteUser(@Query('email') userEmail: string): Promise<User> {
    return this.usersService.deleteUser(userEmail);
  }

  @Put('/promote')
  @ApiSecurity(JWT_SECURITY)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    summary: 'Promote a user to moderator',
    description: "Update a user's role to Moderator",
  })
  promoteUserToModerator(@Query('email') userEmail: string): Promise<User> {
    return this.usersService.updateUser(userEmail, { role: UserRole.MODERATOR });
  }
}
