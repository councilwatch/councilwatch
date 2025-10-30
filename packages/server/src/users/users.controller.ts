import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JWT_SECURITY } from '../auth/auth.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/user-role.decorator';
import { UpdateUserDto } from './dto/updateUserDto';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Get the currently logged in user',
  })
  async getUser(@CurrentUser() user: User): Promise<User> {
    return await this.usersService.getUserById(user.id, true);
  }

  @Get('/:id')
  @ApiSecurity(JWT_SECURITY)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    summary: 'Get a user by Id',
  })
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id, true);
  }

  @Put('/:id')
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Update a user',
    description: 'Update',
  })
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UpdateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUser(id, user, userUpdateDto);
  }

  @Delete('/:id')
  @ApiSecurity(JWT_SECURITY)
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Allows a user to delete themselves, and a moderator to delete other users',
  })
  deleteUser(@Param('id') id: string, @CurrentUser() user: User): Promise<User> {
    return this.usersService.deleteUser(id, user);
  }
}
