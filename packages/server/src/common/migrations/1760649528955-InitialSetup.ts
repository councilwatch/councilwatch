import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from 'typeorm';

// TODO: Normally, we would NEVER modify a migration after it has been committed to main but because we're
// still in the process of setting things up, we can make an exception here until we get to a stable point.

export class InitialSetup1760649528955 implements MigrationInterface {
  private readonly USER_ROLE_ENUM = 'user_role';
  private readonly USERS_TABLE = 'users';
  private readonly EVENTS_TABLE = 'events';
  private readonly COUNCILS_TABLE = 'councils';
  private readonly EVENTS_COUNCIL_FK = 'FK_events_council_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    const usersTable = new Table({
      name: this.USERS_TABLE,
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isUnique: true, isNullable: false },
        { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
        {
          name: 'role',
          type: this.USER_ROLE_ENUM,
          isNullable: false,
          default: `'user'`,
        },
        {
          name: 'councils',
          type: 'text',
          isNullable: false,
          default: "''",
        },
      ],
    });

    const councilsTable = new Table({
      name: this.COUNCILS_TABLE,
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'name', type: 'varchar', isNullable: false },
        { name: 'lat', type: 'double precision', isNullable: false },
        { name: 'lon', type: 'double precision', isNullable: false },
      ],
      indices: [{ columnNames: ['name'], isUnique: false }],
    });

    const eventsTable = new Table({
      name: this.EVENTS_TABLE,
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, isUnique: true, isNullable: false },
        { name: 'title', type: 'varchar', isNullable: false },
        { name: 'description', type: 'text', isNullable: false },
        { name: 'date', type: 'timestamptz', isNullable: false },
        { name: 'council_id', type: 'int', isNullable: false },
        { name: 'approved', type: 'boolean', isNullable: false, default: 'false' },
      ],
      indices: [{ columnNames: ['council_id'] }, { columnNames: ['approved'] }],
    });

    await queryRunner.query(`CREATE TYPE ${this.USER_ROLE_ENUM} AS ENUM('admin', 'moderator', 'user')`);

    await queryRunner.createTable(usersTable, true);
    await queryRunner.createTable(councilsTable, true);
    await queryRunner.createTable(eventsTable, true);

    await queryRunner.createForeignKey(
      this.EVENTS_TABLE,
      new TableForeignKey({
        name: this.EVENTS_COUNCIL_FK,
        columnNames: ['council_id'],
        referencedTableName: this.COUNCILS_TABLE,
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.EVENTS_TABLE, this.EVENTS_COUNCIL_FK);
    await queryRunner.dropTable(this.EVENTS_TABLE, true);
    await queryRunner.dropTable(this.COUNCILS_TABLE, true);
    await queryRunner.dropTable(this.USERS_TABLE, true);
    await queryRunner.query(`DROP TYPE ${this.USER_ROLE_ENUM}`);
  }
}
