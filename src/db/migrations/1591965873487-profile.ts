import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Profile1591965873487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "surname",
            type: "varchar",
          },
          {
            name: "telephone",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "userId",
            type: "varchar",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "profiles",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable("profiles");
    await queryRunner.dropTable("profiles");
  }
}
