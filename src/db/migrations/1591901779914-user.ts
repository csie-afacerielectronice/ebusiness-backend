import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1591901779914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "role",
            type: "varchar",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf("userId") !== -1,
    );
    await queryRunner.dropForeignKey("users", foreignKey);
    await queryRunner.dropTable("users");
  }
}
