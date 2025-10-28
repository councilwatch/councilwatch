import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryColumn({ name: 'id' })
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

  @Column({
    name: 'councils',
    type: 'simple-array',
  })
  councils: string[];
}
