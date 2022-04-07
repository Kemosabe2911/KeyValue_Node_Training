import { AbstractEntity } from "./AbstractEntity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany, JoinColumn } from "typeorm";
import { Department } from "./Department";

@Entity("projects")
export class Project extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id : string;

    @Column({ nullable: false })
    public name : string;

    @Column({ nullable : true })
    public description : string;

    @Column({ nullable : false, default: true })
    public isActive : boolean

    // @ManyToOne((type) => Department, {cascade : true })
    // @JoinColumn()
    // public department : Department

}