import {MigrationInterface, QueryRunner} from "typeorm";

export class projectsTable1648804589954 implements MigrationInterface {
    name = 'projectsTable1648804589954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
