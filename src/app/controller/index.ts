/**
 * Wraps Controllers for easy import from other modules
 */
import { Repository } from "typeorm";
import { Employee } from "../entities/Employee";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { ProjectRepository } from "../repository/ProjectRepository";
import { RoleRepository } from "../repository/RoleRepository";
import { AddressRepository } from "../repository/AddressRepository";
import { DepartmentService } from "../services/DepartmentService";
import { EmployeeService } from "../services/EmployeeService";
import { ProjectService } from "../services/ProjectService";
import { RoleService } from "../services/RoleService";
import { AddressService } from "../services/AddressService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
import ProjectController from "./ProjectController";
import RoleController from "./RoleController";
import AddressController from "./AddressController";

// const employee = new Employee();
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);

const departmentRepository = new DepartmentRepository();
const departmentService = new DepartmentService(departmentRepository);

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);

const addrRepository =  new AddressRepository();
const addrService = new AddressService(addrRepository);

export default [
  new HealthController(),
  new EmployeeController(employeeService),
  new DepartmentController(departmentService),
  new ProjectController(projectService),
  new RoleController(roleService),
  new AddressController(addrService)
];
