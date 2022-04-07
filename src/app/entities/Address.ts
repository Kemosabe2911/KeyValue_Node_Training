import { AbstractEntity } from "./AbstractEntity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany, JoinColumn, OneToOne } from "typeorm";
import { Employee } from "./Employee";

@Entity("address")
export class Address extends AbstractEntity{
    @PrimaryGeneratedColumn("uuid")
    public id : string;

    @Column({nullable: false})
    public address : string;

}