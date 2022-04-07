import { AbstractEntity } from "./AbstractEntity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany, JoinColumn } from "typeorm";
import { Department } from "./Department";

@Entity("roles")
export class Roles extends AbstractEntity{
    @PrimaryGeneratedColumn("uuid")
    public id : string;

    @Column({ nullable: false })
    public role : string;
}