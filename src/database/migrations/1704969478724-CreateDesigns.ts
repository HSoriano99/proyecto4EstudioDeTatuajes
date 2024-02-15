import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDesigns1704969478724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

        await queryRunner.createTable(
            new Table({
              name: "designs",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "artist_id",
                  type: "int",
                  
                },
                {
                  name: "design_name",
                  type: "varchar",
                  length: "50",
                },
                {
                  name: "image",
                  type: "varchar",
                  length: "255",
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["artist_id"],
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
                },
              ],
            }),
            true
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable("designs");
        }
      }
      