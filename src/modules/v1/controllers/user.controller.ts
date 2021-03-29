import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { hdlResponse } from "../../../services/response-handler.service";
import { Op, Transaction } from 'sequelize';
import { ValidateSchema, IValidateResponse } from '../../../services/validator.service';
import { Logger } from '../../../services/winston.service';
import { UserSchema, LoginSchema, IUserInput } from '../validators/user.validator';
import { Models, DbConfig } from '../../../services/sequelize.service';
import { TokenService } from '../../../services/jwt.service';

export class UserController {
    public async login(request: Request, response: Response) {
        try {
            Logger.info('Start process - login - authenticate user');
            // 1. Validate input parameters
            const Params: IUserInput = request.body;
            const Validation: IValidateResponse = ValidateSchema(Params, LoginSchema);
            if (!Validation.success){
                Logger.info(`End process - login - authenticate user - ${JSON.stringify(Validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', Validation.errors);
            }
            // 2. Authenticate user
            const UserFind: any = await Models.User.findOne({ where: { username: Params.username } });
            if (UserFind) {
                const checkPass: boolean = bcrypt.compareSync(Params.password, UserFind.password);
                if (checkPass) {
                    const TokenServ = new TokenService();
                    const GenerateToken: string = TokenServ.sign(UserFind);
                    const UpdateToken = await Models.User.update({ token: GenerateToken }, {
                        where: { id: UserFind.id }
                    });
                    if (!Array.isArray(UpdateToken) || UpdateToken[0] !== 1) {
                        Logger.info(`End process - login - authenticate user - User token not updated`);
                        return hdlResponse.setResponse(response, 500, 'Error User token not updated!', UpdateToken);
                    }
                    const DataResponse = { user: JSON.parse(JSON.stringify(UserFind)), token: GenerateToken };
                    delete DataResponse.user.password;
                    delete DataResponse.user.token;
                    Logger.info(`End process - login - authenticate user - ${JSON.stringify(DataResponse)}`);
                    return hdlResponse.setResponse(response, 200, 'User has been authenticated successfully!', DataResponse);
                }
            }
            Logger.info(`End process - login - authenticate user - User incorrect credentials - ${JSON.stringify(UserFind)}`);
            return hdlResponse.setResponse(response, 404, 'Incorrect credentials!', Params);
        } catch (error) {
            Logger.error('Error - login', error);
            Logger.info('End process - Error login');
            return hdlResponse.setResponse(response, 500, 'Error user not login, please try again!', error);
        }
    }

    public async storeUser(request: Request | any, response: Response) {
        try {
            Logger.info('Start process - storeUser - store new user');
            // 1. Validate input parameters
            const params: IUserInput = request.body;
            const author: number = request.user.sub;
            const validation: IValidateResponse = ValidateSchema(params, UserSchema);
            if (!validation.success){
                Logger.info(`End process - storeUser - store new user - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Store new user
            const NewUser = await this.saveUser(params, author);
            if (NewUser.success){
                Logger.info(`End process - storeUser - store new user - ${JSON.stringify(NewUser)}`);
                return hdlResponse.setResponse(response, 200, 'User has been stored successfully!', NewUser.data);
            } else {
                Logger.info(`End process - storeUser - store new user - ${JSON.stringify(NewUser)}`);
                return hdlResponse.setResponse(response, 409, 'Error user not stored!', NewUser.errors);
            }
        } catch (error) {
            Logger.error('Error - storeUser', error);
            Logger.info('End process - Error storeUser');
            return hdlResponse.setResponse(response, 500, 'Error user not stored, please try again!', error);
        }
    }

    private async saveUser(params: IUserInput, author: number): Promise<IResponse> {
        Logger.info('Start step - saveUser');
        const response: IResponse = { success: false, errors: [] };
        const duplicated = await Models.User.count({ 
            where: { [Op.or]: [
                { username: params.username }, 
                { email: params.email }
            ]}
        });
        if (duplicated) {
            response.success = false;
            response.errors = ['Username or email already exists!'];
        } else {
            const transaction: Transaction = await DbConfig.transaction();
            const NewUser: any = await Models.User.create({
                name: params.name,
                last_name: params.last_name,
                email: params.email,
                username: params.username,
                password: this.passEncrypt(params.password),
                created_by: author,
            }, { transaction });
            if (NewUser) {
                const dataPermissions = params.permissions.map((permission) => ({
                    ...permission,
                    user_id: NewUser.id,
                    created_by: author,
                }));
                const NewPermissions = await Models.Permission.bulkCreate(
                    dataPermissions,
                    { transaction }
                );
                if (Array.isArray(NewPermissions) && NewPermissions.length === params.permissions.length) {
                    const DataResponse = { user: { 
                        ...JSON.parse(JSON.stringify(NewUser)), 
                        permissions: JSON.parse(JSON.stringify(NewPermissions)), 
                    }};
                    delete DataResponse.user.password;
                    response.success = true;
                    response.data = DataResponse;
                    await transaction.commit();
                } else {
                    response.success = false;
                    response.errors = ['User permissions not stored'];
                    await transaction.rollback();
                }
            } else {
                response.success = false;
                response.errors = ['User not stored'];
                await transaction.rollback();
            }
        }
        Logger.info(`End step - saveUser - response -> ${JSON.stringify(response)}`);
        return response; 
    }

    private passEncrypt(passw: string): string {
        Logger.info('Start step - passEncrypt');
        const SaltRounds = 10;
        const output: string = bcrypt.hashSync(passw, SaltRounds);
        Logger.info(`End step - passEncrypt - response -> ${JSON.stringify(output)}`);
        return output;
    }

    public async getUser(id: number) {
        try {
            Logger.info('Start process - getUser - get user');
            const User = await Models.User.findOne({ where: { id }});
            Logger.info(`End process - getUser - get user - ${JSON.stringify(User)}`);
            return User;
        } catch (error) {
            Logger.error('Error - getUser', error);
            Logger.info('End process - Error getUser');
            return false;
        }
    }

    public async getPermissions(id: number) {
        try {
            Logger.info('Start process - getPermissions - get user permissions');
            const Permissions = await Models.Permission.findAll({ where: { user_id: id }});
            Logger.info(`End process - getPermissions - get user permissions - ${JSON.stringify(Permissions)}`);
            return Permissions;
        } catch (error) {
            Logger.error('Error - getPermissions', error);
            Logger.info('End process - Error getPermissions');
            return false;
        }
    }
    
}

interface IResponse {
    success: boolean,
    data?: any,
    errors: any[],
}