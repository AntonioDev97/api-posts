import { Request, Response, NextFunction } from 'express';
import { hdlResponse } from '../services/response-handler.service';

export const ApiKeyAccess = (request: Request, response: Response, next: NextFunction) => {
    const AuthorizedKey: string|undefined = process.env.APIKEY;
    const HeaderKey: string|string[]|undefined = request.headers.apikey;
    if (!HeaderKey || !AuthorizedKey) 
        return hdlResponse.setResponse(response, 401, 'Missing Api Key');
    
    if (AuthorizedKey !== HeaderKey) 
        return hdlResponse.setResponse(response, 401, 'Invalid Api Key');
    
    //Here you can add another security methods like encrypt request data
    next();
} 