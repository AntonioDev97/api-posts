import { Request, Response } from 'express';
import { hdlResponse } from '../../../services/response-handler.service';
import { Models } from '../../../services/sequelize.service';

export class PostController {
    public async storePost(request: Request, response: Response) {
        try {
            const data = await Models.User.findAll();
            return hdlResponse.setResponse(response, 200, 'Post create works', data);
        } catch (error) {
            
        }
    }
}