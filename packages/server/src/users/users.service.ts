import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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

  async getUser(email: string, throwIfNotFound?: true): Promise<User>;
  async getUser(email: string, throwIfNotFound?: false): Promise<User | null>;
  async getUser(email: string, throwIfNotFound: boolean = false): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user && throwIfNotFound) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async updateUser(email: string, updateDto: Partial<User>): Promise<User> {
    const user = await this.getUser(email);

    const result = await this.usersRepository.update({ email }, updateDto);

    if (typeof result.affected !== 'number' || result.affected === 0) {
      throw new InternalServerErrorException('Failed to update user');
    }

    return { ...user, ...updateDto };
  }

  async deleteUser(email: string): Promise<User> {
    const user = await this.getUser(email, true);
    const result = await this.usersRepository.remove(user);

    return result;
  }
}
