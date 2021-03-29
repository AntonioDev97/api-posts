import { Request } from 'express';

interface IPermission {
    id?: number,
    module: string,
    permission: string,
    user_id: number,
    description?: string,
    created_by: number,
    updated_by?: number,
    createdAt: Date,
    updatedAt?: Date,
}

export interface IPayloadUser {
    sub: number,
    name: string,
    last_name: string,
    username: string,
    email: string,
    iat: number,
    exd: number,
    permissions: IPermission
}

export interface IRequestAuth extends Request{
    user: IPayloadUser
}
