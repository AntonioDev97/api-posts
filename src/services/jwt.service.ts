import jwt, { SignOptions } from 'jsonwebtoken';
import moment from 'moment';
import { IUserModel } from '../modules/v1/models/user.model';

export class TokenService {
    private readonly Secret: string = String(process.env.TOKEN_SECRET);
    private readonly Config: SignOptions = {
        algorithm: 'HS256',
        expiresIn: String(process.env.TOKEN_EXPIRED) || '2h',
    }
    private payload: any;

    public sign(user: IUserModel): string {
        this.payload = {
            sub: user.id,
            name: user.name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            iat: moment().utc().unix(),
            exd: moment().add(2, 'hours').utc().unix()
        }
        return jwt.sign(this.payload, this.Secret, this.Config);
    }

    public verify(token: string) {
        return jwt.verify(token, this.Secret, this.Config);
    }
}