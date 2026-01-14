import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTest1768422981216 implements MigrationInterface {
    name = 'UserTest1768422981216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_test\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user_test\``);
    }

}
