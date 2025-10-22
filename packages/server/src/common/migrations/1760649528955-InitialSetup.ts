import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

// TODO: Normally, we would NEVER modify a migration after it has been committed to main but because we're
// still in the process of setting things up, we can make an exception here until we get to a stable point.

export class InitialSetup1760649528955 implements MigrationInterface {
  private readonly USER_ROLE_ENUM = 'user_role';
  private readonly USERS_TABLE = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    const usersTable = new Table({
      name: this.USERS_TABLE,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isUnique: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
        {
          name: 'role',
          type: this.USER_ROLE_ENUM,
          isNullable: false,
          default: `'user'`,
        },
      ],
      indices: [{ name: 'idx_users_email', columnNames: ['email'], isUnique: true }],
    });

    await queryRunner.query(`CREATE TYPE ${this.USER_ROLE_ENUM} AS ENUM('admin', 'moderator', 'user')`);

    await queryRunner.createTable(usersTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.USERS_TABLE, true);
    await queryRunner.query(`DROP TYPE ${this.USER_ROLE_ENUM}`);
  }
}
