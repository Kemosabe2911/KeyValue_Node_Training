import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { Roles } from "./Roles";
import { Address } from "./Address";

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false, unique: true })
    public username: string;

    @Column({ nullable: true })
    public password: string;

    @Column({ nullable: false })
    public age: number;

    @Column({ nullable: false, default: true })
    public isActive: boolean;

    @ManyToOne((type) => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @ManyToOne((type) => Roles, { cascade: true })
    @JoinColumn()
    public role: Roles;

    @OneToOne((type) => Address, { cascade: true })
    @JoinColumn()
    public address: Address;

    @Column()
    public departmentId: string;

    @Column({ nullable: true })
    public roleId: string;

    @Column({nullable: true})
    public addressId: string
}
