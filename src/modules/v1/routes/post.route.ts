import express, { Router, Request, Response } from "express";
import { PostController } from "../controllers/post.controller";

class PostRoutes {
    public route: Router = express.Router();
    private PostCtrl: PostController = new PostController();

    constructor() {
        this.setPostRoutes();
    } 

    private setPostRoutes(): void {
        this.route.post('/posts', (req: Request, res: Response) => this.PostCtrl.storePost(req, res));
    }
}

export default new PostRoutes().route;