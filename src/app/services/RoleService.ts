import { plainToClass } from "class-transformer";
import { Roles } from "../entities/Roles";
import { RoleRepository } from "../repository/RoleRepository";

export class RoleService{
    constructor(
        private roleRepository : RoleRepository
    ){}

    public async createRole(roleInput: any){
        const roleData = plainToClass(Roles, {
            "role" : roleInput.role,
        });
        const savedDetails = await this.roleRepository.createRole(roleData);
        return savedDetails;
    }

    public async getAllRoles(){
        return this.roleRepository.getAllRoles();
    }

    public async getEmployeeByRole(role: string){
        return this.roleRepository.getEmployeeByRole(role);
    }

    public async updateRole(roleId: string, role: any){
        return this.roleRepository.updateRole(roleId, role);
    }

    public async deleteRole(id: string){
        return this.roleRepository.deleteRole(id);
    }
}