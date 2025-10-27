import { Body, Controller, Delete, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JWT_SECURITY } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/user-role.decorator';
import { Result } from '../common/dto/result.dto';
import { UpdateCriteriaDto } from './dto/update-criteria.dto';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/criteria')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Get notification criteria for a user',
    description:
      'Get the critera (councils/meeting updates) that determines when a user will receive a notification',
  })
  getUserNotificationCriteria(@CurrentUser() user: User): Promise<User> {
    return this.usersService.getUser(user.email);
  }

  @Put('/criteria')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Update notification criteria for a user',
    description:
      'Set the critera (councils/meeting updates) that determines when a user will receive a notification',
  })
  updateUserNotificationCriteria(@Body() criteria: UpdateCriteriaDto): Promise<Result> {
    return this.usersService.updateUserNotificationCriteria(criteria);
  }

  @Delete('/me')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiSecurity(JWT_SECURITY)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    summary: 'Promote a user to moderator',
    description: "Update a user's role to Moderator",
  })
  promoteUserToModerator(@CurrentUser() user: User): Promise<User> {
    return this.usersService.getUser(user.email);
  }
}
