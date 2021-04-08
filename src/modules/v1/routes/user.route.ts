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
        // Login to authenticate an user.
        this.route.post('/login', (req: Request, res: Response) => this.UserCtrl.login(req,res));

        // Save new user with their permissions.
        this.route.post('/users', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.UserCtrl.storeUser(req, res));

        // Retrieve list of users.
        this.route.get('/users', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.UserCtrl.getUsers(req, res));

        // Retrieve details of an user.
        this.route.get('/users/:id', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.UserCtrl.getUserById(req, res));
    }
}

export default new UserRoute().route;