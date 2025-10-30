import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

const USER_ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.USER]: 0,
  [UserRole.MODERATOR]: 1,
  [UserRole.ADMIN]: 2,
};

export function hasHigherOrEqualRole(user: UserRole, required: UserRole): boolean {
  return USER_ROLE_HIERARCHY[user] >= USER_ROLE_HIERARCHY[required];
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
