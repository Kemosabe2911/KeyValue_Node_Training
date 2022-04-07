import { AbstractController } from "../util/rest/controller";
import APP_CONSTANTS from "../constants";
import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/ProjectService";
import RequestWithUser from "../util/rest/request";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateProjectDto } from "../dto/CreateProject";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import HttpException from "../exception/HttpException";

class ProjectController extends AbstractController {
    constructor(
        private projectService: ProjectService
    ) {
        super(`${APP_CONSTANTS.apiPrefix}/projects`);
        this.initializeRoutes();

    }

    protected initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
            this.createProject
        );
    }

    private createProject = async (
        request : RequestWithUser,
        response : Response,
        next : NextFunction
    ) => {
        try{
            const data = await this.projectService.createProject(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            // console.log(err);
            // throw new HttpException(400, 'Failed');
            next(err) ;
        }
    }
}

export default ProjectController;