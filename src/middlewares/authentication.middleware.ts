import { Response, NextFunction } from "express";
import moment from "moment";
import { UserController } from "../modules/v1/controllers/user.controller";
import { IRequestAuth } from "../modules/v1/interfaces/request.interface";
import { TokenService } from "../services/jwt.service";
import { hdlResponse } from "../services/response-handler.service";
import { Logger } from "../services/winston.service";

export const EnsureAuth: any = async (request: IRequestAuth, response: Response, next: NextFunction) => {
    try {
        const TokenServ: TokenService = new TokenService();
        Logger.info('Start Process - EnsureAuth - User token authentication');
        let headerToken: string | undefined = request.headers.authorization;
        if (!headerToken || headerToken.length < 100) {
            Logger.info(`End Process - EnsureAuth - Missing token: ${headerToken}`);
            return hdlResponse.setResponse(response, 401, 'Missing Authorization Token!', headerToken);
        }
        headerToken = headerToken.replace(/['"]+/g,'');
        const PayLoad: any = TokenServ.verify(headerToken);
        if(PayLoad.exd <= moment.utc().unix()){
            Logger.info(`End Process - EnsureAuth - Token expired: ${PayLoad.exd}`);
            return hdlResponse.setResponse(response, 401, 'Authorization Token Expired!', headerToken);
        }
        const UserCtrl: UserController = new UserController();
        const UserFind: any = await UserCtrl.getUser(PayLoad.sub);
        if (!UserFind || headerToken !== UserFind.token) {
            Logger.info(`End Process - EnsureAuth - Invalid old token: ${PayLoad.exd}`);
            return hdlResponse.setResponse(response, 401, 'Invalid old authorization token!', headerToken);
        }
        const PermissionsFind: any = await UserCtrl.getPermissions(PayLoad.sub);
        request.user = PayLoad;
        if (PermissionsFind) request.user.permissions = PermissionsFind;
        Logger.info(`End Process - EnsureAuth - User token authentication - ${JSON.stringify(request.user)}`);
    } catch (error) {
        Logger.error('Error - EnsureAuth', error);
        Logger.info('End Process - Error on user token authentication - EnsureAuth');
        return hdlResponse.setResponse(response, 401, 'Invalid authorization token!');
    }
    return next();
}