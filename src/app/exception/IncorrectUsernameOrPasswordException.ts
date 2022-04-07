import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";

class IncorrectUsernameOrPasswordException extends HttpException {
    constructor() {
        const errorDetails = ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD;
        super(401, errorDetails.MESSAGE, errorDetails.CODE);
    }
}

export default IncorrectUsernameOrPasswordException;