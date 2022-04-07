import { AbstractController } from "../util/rest/controller";
import APP_CONSTANTS from "../constants";
import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../util/rest/request";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateProjectDto } from "../dto/CreateProject";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import HttpException from "../exception/HttpException";
import { RoleService } from "../services/RoleService";


class RoleController extends AbstractController{
    constructor(
        private roleService: RoleService
    ) {
        super(`${APP_CONSTANTS.apiPrefix}/roles`);
        this.initializeRoutes();

    }

    protected initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            this.createRole
        );

        this.router.get(
            `${this.path}`,
            this.getAllRoles
        );

        this.router.post(
            `${this.path}/role`,
            this.getEmployeeByRole
        );

        this.router.put(
            `${this.path}/:roleId`,
            this.updateRole
        );

        this.router.delete(
            `${this.path}/:roleId`,
            this.deleteRole
        )
}

    private createRole = async (
        request : RequestWithUser,
        response : Response,
        next : NextFunction
    ) => {
        try{
            const data = await this.roleService.createRole(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            console.log(err)
            next(err) ;
        }
    }

    private getAllRoles = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        const data = await this.roleService.getAllRoles();
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        );
    }

    private getEmployeeByRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        try{
            const data = await this.roleService.getEmployeeByRole(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            console.log(err)
            next(err) ;
        }    
    }

    private updateRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        try{
            const data = await this.roleService.updateRole(request.params.roleId, request.body);
            response.status(201).send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            console.log(err)
            next(err) ;
        }
    }

    private deleteRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        try{
            const data = await this.roleService.deleteRole(request.params.id);
            response.status(201).send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            console.log(err)
            next(err) ;
        }
    }

}

export default RoleController;