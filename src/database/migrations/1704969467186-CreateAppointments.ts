import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1704969467186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

        await queryRunner.createTable(
            new Table({
              name: "appointments",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "client",
                  type: "int",
                  isNullable: true,
                },
                {
                  name: "artist",
                  type: "int",
                  isNullable: true,
                },
                {
                  name: "date",
                  type: "varchar",
                  length: "50",
                  isNullable: true,
                },
                {
                  name: "shift",
                  type: "enum",
                  enum: ["morning", "afternoon"],
                  isNullable: true,
              },
              ],
              foreignKeys: [
                {
                  columnNames: ["client"],
                  referencedTableName: "clients",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
                {
                  columnNames: ["artist"],
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable("appointments");
    }

}
