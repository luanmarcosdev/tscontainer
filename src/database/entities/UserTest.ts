import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_test')
export class UserTest {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!:string;
    
}