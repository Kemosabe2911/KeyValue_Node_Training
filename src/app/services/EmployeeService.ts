import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";

export class EmployeeService {
    constructor(
        private employeeRepository: EmployeeRepository
    ) {}
    public async getAllEmployees() {
        return this.employeeRepository.getAllEmployees();
    }

    public async getEmployeeById(employeeId: string) {
      console.log(employeeId)
        const data = await this.employeeRepository.getEmployeeById(employeeId);
        console.log(data)
        return data;
    }

    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                age: employeeDetails.age,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '',
                departmentId: employeeDetails.departmentId,
                isActive: true,
                roleId: employeeDetails.roleId,
                addressId: employeeDetails.addressId
            });
            const save = await this.employeeRepository.saveEmployeeDetails(newEmployee);
            // delete save.password;
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee");
        }
    }

    public async updateEmployee(employeeId: string, employeeDetails: any) {
        // Approach 1
        const updatedEmployee = await this.employeeRepository.updateEmployeeDetails(employeeId, employeeDetails);
        // const updatedEmployee = await this.employeeRepository.
        //                         updateEmployeeDetailsQueryBuilder(employeeId, employeeDetails);
        return updatedEmployee;

        // //Approach 2
        // const employee = await this.getEmployeeById(employeeId);
        // if (!employeeId) {
        //     throw new HttpException(400, `Employee not found`);
        // }

        // employee.name = (employeeDetails.name) ? employeeDetails.name : employee.name;
        // employee.age = (employeeDetails.age) ? employeeDetails.age : employee.age;

        // const updatedEmployee = await this.employeeRepository.saveEmployeeDetails(employee);
        // return updatedEmployee;
    }

    public async deleteEmployee(employeeId: string) {
        return this.employeeRepository.softDeleteEmployeeById(employeeId);
        // return this.employeeRepository.hardDeleteEmployeeById(employeeId);

        // // Hard Remove ( Fetches the entity then deletes it )
        // const employeeDetails = await this.employeeRepository.getEmployeeById(employeeId);
        // return this.employeeRepository.hardRemoveEmployee(employeeDetails);
    }

    public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepository.getEmployeeByUsername(
          username
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        if (await bcrypt.compare(password, employeeDetails.password)) {
            // console.log("Hello");
          let payload = {
            "custom_id": employeeDetails.id,
            "custom_email": employeeDetails.username,
            "custom_role": "ADMIN"
          };
          const token = this.generateAuthTokens(payload);
          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

      private generateAuthTokens = (payload: any) => {
          return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
              expiresIn:process.env.ID_TOKEN_VALIDITY,
          });
      };
}
