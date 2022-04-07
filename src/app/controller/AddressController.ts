import { AbstractController } from "../util/rest/controller";
import APP_CONSTANTS from "../constants";
import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../util/rest/request";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateProjectDto } from "../dto/CreateProject";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import HttpException from "../exception/HttpException";
import { AddressService } from "../services/AddressService";

class AddressController extends AbstractController{
    constructor(
        private addrService: AddressService
    ) {
        super(`${APP_CONSTANTS.apiPrefix}/address`);
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            this.createAddr
        )

        this.router.get(
            `${this.path}`,
            this.getAllAddress
        )
        
    }

    private createAddr = async (
        request : RequestWithUser,
        response : Response,
        next : NextFunction
    ) => {
        try{
            const data = await this.addrService.createAddr(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }catch(err){
            // console.log(err)
            next(err) ;
        }
    }

    private getAllAddress = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        const data = await this.addrService.getAllAddress();
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        );
    }

}

export default AddressController