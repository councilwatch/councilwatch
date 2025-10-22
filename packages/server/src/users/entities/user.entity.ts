import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
