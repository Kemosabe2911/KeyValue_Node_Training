import {MigrationInterface, QueryRunner} from "typeorm";

export class EmployeeRoles1649312120109 implements MigrationInterface {
    name = 'EmployeeRoles1649312120109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_1c105b756816efbdeae09a9ab65" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_1c105b756816efbdeae09a9ab65"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role_id"`);
    }

}
