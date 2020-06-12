import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Addresses1591966210301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "county",
            type: "varchar",
          },
          {
            name: "isPrimary",
            type: "boolean",
          },
          {
            name: "postalCode",
            type: "varchar",
          },
          {
            name: "userId",
            type: "varchar",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "addresses",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable("addresses");
    await queryRunner.dropTable("addresses");
  }
}
