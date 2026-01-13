import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('teste_crm')
export class TesteCRM {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

}