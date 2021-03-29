import dotenv, { DotenvConfigOutput } from 'dotenv'; dotenv.config();
import { AppServer } from './src/app';
import { DbConfig } from './src/services/sequelize.service';

/**
 * @author Antonio Olvera
 * @description init application server
 */
class InitApplication {
    constructor() {
        this.initServer();
    }

    public static initEnviroment(): DotenvConfigOutput {
        return dotenv.config();
    }

    private initServer(): void {
        const _PORT: number = Number(process.env.PORT) || 4000;
        const APP: AppServer = new AppServer();
        APP.server.listen(_PORT, () => {
            console.log(`Server Running on Port ${_PORT}`);
        });
    }
}

(async () => {
    //Init enviroment
    InitApplication.initEnviroment();
    //Init database
    const DbInit: boolean = await new Promise(
        (resolve, reject) => DbConfig.sync()
            .then(() => resolve(true))
            .catch((error) => reject(error)));
    if (DbInit) {
        //Init server application
        new InitApplication();
    } else console.error('Database error', DbInit);
})();