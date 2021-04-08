import express, { Router, Request, Response } from "express";
import { EnsureAuth } from "../../../middlewares/authentication.middleware";
import { PostController } from "../controllers/post.controller";
import { AllowPath } from "../middlewares/post.middleware";

class PostRoutes {
    public route: Router = express.Router();
    private PostCtrl: PostController = new PostController();

    constructor() {
        this.setPostRoutes();
    } 

    private setPostRoutes(): void {
        // Create new post
        this.route.post('/posts', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.storePost(req, res));
        // Edit a post
        this.route.put('/posts', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.editPost(req, res));
        // Get list of posts
        this.route.get('/posts', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.getPosts(req, res));
        // Get post details
        this.route.get('/posts/:id', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.getPostById(req, res));
        // Delete a post
        this.route.delete('/posts/:id', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.deletePost(req, res));
        // Store new review
        this.route.post('/posts/reviews', [EnsureAuth, AllowPath], (req: Request, res: Response) => this.PostCtrl.storeReview(req, res));
    }
}

export default new PostRoutes().route;