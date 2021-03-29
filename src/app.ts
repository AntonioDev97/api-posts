import express, { Express } from 'express';
import helmet  from 'helmet';
import cors, { CorsOptions } from 'cors';
import { ApiKeyAccess } from '../src/middlewares/apikey.middleware';
import V1PostRoutes from './modules/v1/routes/post.route';
import V1UserRoutes from './modules/v1/routes/user.route';

export class AppServer {
    public server:Express = express();

    constructor() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(helmet());
        this.setHeaders();
        this.server.use(ApiKeyAccess);
        this.setEndPoints();
    }

    private setHeaders(): void {
        const config: CorsOptions = {
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: [
                'Access-Control-Allow-Origin',
                'ApiKey',
                'Authorization',
                'X-API-KEY',
                'Origin',
                'X-Requested-With',
                'Content-Type, Accept',
                'Access-Control-Allow-Request-Method'
            ]
        }
        this.server.use(cors(config));
    }

    private setEndPoints(): void {
        this.server.use('/v1', [
            V1PostRoutes,
            V1UserRoutes,
        ]);
    }
}