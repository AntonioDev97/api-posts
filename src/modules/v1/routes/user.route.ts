import express, { Request, Response, Router } from "express";
import { EnsureAuth } from "../../../middlewares/authentication.middleware";
import { UserController } from '../controllers/user.controller';
import { AllowPath } from "../middlewares/user.middleware";

class UserRoute {
    public route: Router = express.Router(); 
    private UserCtrl: UserController = new UserController();

    constructor() {
        this.setUserRoutes();
    }

    private setUserRoutes(): void {

        this.route.post('/login', (req: Request, res: Response) => this.UserCtrl.login(req,res));

        this.route.post('/users', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.UserCtrl.storeUser(req, res));
    }
}

export default new UserRoute().route;