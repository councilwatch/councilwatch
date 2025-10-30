import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/updateUserDto';
import { hasHigherOrEqualRole, User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: User): Promise<User> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async getUserByEmail(email: string, throwIfNotFound?: true): Promise<User>;
  async getUserByEmail(email: string, throwIfNotFound?: false): Promise<User | null>;
  async getUserByEmail(email: string, throwIfNotFound: boolean = false): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user && throwIfNotFound) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async getUserById(id: string, throwIfNotFound?: true): Promise<User>;
  async getUserById(id: string, throwIfNotFound?: false): Promise<User | null>;
  async getUserById(id: string, throwIfNotFound: boolean = false): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user && throwIfNotFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(targetUserId: string, requestingUser: User, updateDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(targetUserId, true);

    this.checkUserCanModifyTarget(requestingUser, userToUpdate);
    this.checkUserCanModifyFields(requestingUser, updateDto);

    const result = await this.usersRepository.update({ id: targetUserId }, updateDto);
    this.validateUpdateResult(result);

    return { ...userToUpdate, ...updateDto };
  }

  async deleteUser(targetUserId: string, requestingUser: User): Promise<User> {
    const userToDelete = await this.getUserById(targetUserId, true);

    this.checkUserCanModifyTarget(requestingUser, userToDelete);

    return this.usersRepository.remove(userToDelete);
  }

  private isRegularUser(user: User): boolean {
    return user.role === UserRole.USER;
  }

  private isOwnUser(requestingUser: User, targetUserId: string): boolean {
    return targetUserId === requestingUser.id;
  }

  private checkUserCanModifyTarget(requestingUser: User, targetUser: User): void {
    // Regular users can only modify themselves
    if (this.isRegularUser(requestingUser) && !this.isOwnUser(requestingUser, targetUser.id)) {
      throw new ForbiddenException('Insufficient Permissions');
    }

    // Moderators and admins cannot modify users with higher or equal roles (except themselves)
    if (
      !this.isOwnUser(requestingUser, targetUser.id) &&
      !hasHigherOrEqualRole(requestingUser.role, targetUser.role)
    ) {
      throw new ForbiddenException('Insufficient Permissions');
    }
  }

  private checkUserCanModifyFields(requestingUser: User, updateDto: UpdateUserDto) {
    if (this.isRegularUser(requestingUser) && !!updateDto.role) {
      throw new ForbiddenException('Insufficient Permissions');
    }
  }

  private validateUpdateResult(result: UpdateResult): void {
    if (typeof result.affected !== 'number' || result.affected === 0) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }
}
