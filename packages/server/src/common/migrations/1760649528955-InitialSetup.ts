import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

// TODO: Normally, we would NEVER modify a migration after it has been committed to main but because we're
// still in the process of setting things up, we can make an exception here until we get to a stable point.

export class InitialSetup1760649528955 implements MigrationInterface {
  private readonly USER_ROLE_ENUM = 'user_role';
  private readonly USERS_TABLE = 'users';
  private readonly EVENTS_TABLE = 'events';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    const usersTable = new Table({
      name: this.USERS_TABLE,
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isUnique: true, isNullable: false },
        { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
        { name: 'role', type: this.USER_ROLE_ENUM, isNullable: false, default: `'user'` },
      ],
    });

    const eventsTable = new Table({
      name: this.EVENTS_TABLE,
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
        { name: 'title', type: 'varchar', isNullable: false },
        { name: 'description', type: 'text', isNullable: false },
        { name: 'date', type: 'timestamptz', isNullable: false },
        { name: 'council_id', type: 'uuid', isNullable: false },
        { name: 'approved', type: 'boolean', isNullable: false, default: 'false' },
      ],
      indices: [{ columnNames: ['council_id'] }, { columnNames: ['approved'] }],
    });

    await queryRunner.query(`CREATE TYPE ${this.USER_ROLE_ENUM} AS ENUM('admin', 'moderator', 'user')`);

    await queryRunner.createTable(usersTable, true);
    await queryRunner.createTable(eventsTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.EVENTS_TABLE, true);
    await queryRunner.dropTable(this.USERS_TABLE, true);
    await queryRunner.query(`DROP TYPE ${this.USER_ROLE_ENUM}`);
  }
}
