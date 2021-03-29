import { JSONSchema7 } from 'json-schema';

export const UserSchema: JSONSchema7 = {
    $id: '/users',
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        }, 
        last_name: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        }, 
        email: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            format: 'email',
        },
        username: {
            type: 'string',
            minLength: 4,
            maxLength: 50,
        },
        password: {
            type: 'string',
            minLength: 6,
            maxLength: 30
        },
        permissions: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    module: {
                        type: 'string',
                        enum: ['users', 'posts']
                    },
                    permission: {
                        type: 'string',
                        enum: ['create', 'edit', 'view', 'delete']
                    },
                    description: {
                        type: ['string', 'null'],
                        minLength: 1,
                    }
                }
            },
            required: ['module', 'permission', 'description']
        }
    },
    required: ['name', 'last_name', 'username', 'password', 'permissions']
};

export const LoginSchema: JSONSchema7 = {
    $id: '/login',
    type: 'object',
    additionalProperties: false,
    properties: {
        email: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            format: 'email',
        },
        username: {
            type: 'string',
            minLength: 4,
            maxLength: 50,
        },
        password: {
            type: 'string',
            minLength: 6,
            maxLength: 30
        }
    },
    required: ['username', 'password']
};

interface IPermissionInput {
    created_by: number;
    module: string,
    permission: string,
    description: string,
}
export interface IUserInput {
    name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    permissions: IPermissionInput[],
}
