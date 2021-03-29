import { Response } from 'express';

class HandleResponse {
    public setResponse(response: Response, status: number, msg: string|null = null, data: any = null): Response {
        const codeOptions: any = {
            200: {
                status: 200,
                type: 'success',
                error: false,
                message: msg,
                data: data
            },
            201: {
                status: 201,
                type: 'success',
                error: false,
                message: msg,
                data: data
            },
            204: {
                status: 204,
                type: 'No Content',
                error: false,
                message: msg,
                data: data
            },
            400: {
                status: 400,
                type: 'Bad request',
                error: true,
                errorDesc: data,
                message: msg
            },
            401: {
                status: 401,
                type: 'Unauthorized',
                error: true,
                errorDesc: data,
                message: msg
            },
            403: {
                status: 403,
                type: 'Forbidden',
                error: true,
                errorDesc: data,
                message: msg
            },
            404: {
                status: 404,
                type: 'Not Found',
                error: true,
                errorDesc: data,
                message: msg
            },
            409: {
                status: 409,
                type: 'Conflict',
                error: true,
                errorDesc: data,
                message: msg
            },
            422: {
                status: 422,
                type: 'Unprocessable Entity',
                error: true,
                errorDesc: data,
                message: msg
            },
            500: {
                status: 500,
                type: 'Server Error',
                error: true,
                errorDesc: data,
                message: msg
            }
        }
        if(status in codeOptions)
            return response.status(status).send(codeOptions[status]);
        else return response.status(status).send(codeOptions[500]);
    }
}

export const hdlResponse = new HandleResponse();
