import { getConnection, Repository } from "typeorm";
import { Roles } from "../entities/Roles";
import { Employee } from "../entities/Employee";

export class RoleRepository extends Repository<Roles>{
    public async createRole( roleDetails : Roles ){
        const rolesConnection = getConnection().getRepository(Roles);
        const saveDetails = await rolesConnection.save(roleDetails);
        return saveDetails;
    }

    public async getAllRoles(){
        const rolesConnection = getConnection().getRepository(Roles);
        return rolesConnection.findAndCount();
    }

    public async updateRole(roleId: string, role: any){
        const rolesConnection = getConnection().getRepository(Roles);
        const updateRoleDetails = await rolesConnection.update({id: roleId},{
            role : role.role ? role.role : undefined
        });
        return updateRoleDetails;
    }

    public async deleteRole(id: string){
        const rolesConnection =  getConnection().getRepository(Roles);
        return await rolesConnection.delete({
            id
        });
    }

    public async getEmployeeByRole( role: string){
        const rolesConnection = getConnection().getRepository(Roles);
        const roleID = await (await rolesConnection.findOne(role)).id;
        // console.log(roleID);
        const employeeConnection = getConnection().getRepository(Employee);
        const employeeDetails = await employeeConnection.findAndCount();
        console.log(employeeDetails)
        // return employeeDetails;
    }

}