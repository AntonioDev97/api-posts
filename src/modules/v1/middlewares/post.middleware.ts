import { Response, NextFunction } from "express";
import { hdlResponse } from "../../../services/response-handler.service";
import { Logger } from "../../../services/winston.service";
import { IPayloadUser, IRequestAuth } from "../interfaces/request.interface";

export const AllowPath = (request: IRequestAuth, response: Response, next: NextFunction) => {
    let allow: boolean = false;
    try {
        Logger.info('Start Process - AllowPath - Posts AllowPath');
        const User: IPayloadUser = request.user;
        const RouteAccessPart: string[] = request.url.split('/');
        const RouteAccess: string = `${request.method}${RouteAccessPart[1]}`.toUpperCase();
        if (!User || !Array.isArray(User.permissions) || !User.permissions.length) {
            Logger.info('End Process - AllowPath - Posts AllowPath');
            return hdlResponse.setResponse(response, 403, "Access denied, you don't have permissions!");
        }
        const Module = User.permissions.filter((mod) => mod.module == RouteAccessPart[1]);
        if(Array.isArray(Module) && Module.length) {
            const isAllow = (right: string) => Module.find((mod) => mod.permission === right);
            const Sources: any = {
                'POSTPOSTS': RouteAccessPart[2] === 'reviews' ? isAllow('review') : isAllow('create'),
                'GETPOSTS': isAllow('view'),
                'PUTPOSTS': isAllow('edit'),
                'DELETEPOSTS': isAllow('delete'),
            };
            allow = RouteAccess in Sources && Sources[RouteAccess] ? true : false;
        }
    } catch (error) {
        Logger.error('Error - Posts AllowPath', error);
        Logger.info('End Process - Error on Posts AllowPath - AllowPath');
        return hdlResponse.setResponse(response, 500, 'Error on access, please try again!');
    }
    if (allow) {
        Logger.info('End Process - posts AllowPath - authorizared');
        return next();
    }
    Logger.info('End Process - posts AllowPath - not authorizared');
    return hdlResponse.setResponse(response, 403, "Access denied, you don't have permissions!");
};