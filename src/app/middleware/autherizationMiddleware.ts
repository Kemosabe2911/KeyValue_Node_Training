import express, { NextFunction } from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";

const authorizationMiddleware = (role: string) => {
    return async (
        request: RequestWithUser,
        response: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const token = getTokenFromRequestHeader(request);
            jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
            // console.log(jsonwebtoken.decode(token))
            const payload = jsonwebtoken.decode(token)
            console.log(payload);
            const decodedstingify=JSON.stringify(payload)
            const decoded=JSON.parse(decodedstingify)
            console.log(decoded)
            // console.log(typeof(payload));
            // console.log(payload['custom:role'])
            // if ( role === JSON.parse(payload).cus)
            if ( decoded.custom_role === role){
              return next();
            }
            else{
              throw console.error("Role doesn't match");
              return next(new UserNotAuthorizedException());
            }
            // return next();
          } catch (error) {
            return next(new UserNotAuthorizedException());
          }
    };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const tokenWithBearerHeader = req.header(
      `${APP_CONSTANTS.authorizationHeader}`
    );
    if (tokenWithBearerHeader) {
      return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
    }
    return "";
};

export default authorizationMiddleware;