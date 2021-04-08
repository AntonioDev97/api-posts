import { Request, Response } from 'express';
import { JSONSchema7 } from 'json-schema';
import { FindOptions } from 'sequelize';
import { hdlResponse } from '../../../services/response-handler.service';
import { Models } from '../../../services/sequelize.service';
import { IValidateResponse, ValidateSchema } from '../../../services/validator.service';
import { Logger } from '../../../services/winston.service';
import { IPostInput, IReviewInput, PostSchema, ReviewSchema } from '../validators/post.validator';

export class PostController {
    public async storePost(request: Request | any, response: Response) {
        try {
            Logger.info('Start process - storePost - store new post');
            // 1. Validate input parameters
            const params: IPostInput = request.body;
            const author: number = request.user.sub;
            const validation: IValidateResponse = ValidateSchema(params, PostSchema);
            if (!validation.success){
                Logger.info(`End process - storePost - store new post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Store new post
            const NewPost = await Models.Post.create({ ...params, author_id: author, created_by: author });
            if (NewPost){
                Logger.info(`End process - storePost - store new post - ${JSON.stringify(NewPost)}`);
                return hdlResponse.setResponse(response, 200, 'Post has been stored successfully!', NewPost);
            } else {
                Logger.info(`End process - storePost - store new post - ${JSON.stringify(NewPost)}`);
                return hdlResponse.setResponse(response, 409, 'Error post not stored!', NewPost);
            }
        } catch (error) {
            Logger.error('Error - storePost', error);
            Logger.info('End process - Error storePost');
            return hdlResponse.setResponse(response, 500, 'Error Post not stored, please try again!', error);
        }
    }

    public async editPost(request: Request | any, response: Response) {
        try {
            Logger.info('Start process - editPost - edit a post');
            // 1. Validate input parameters
            const params: IPostInput = request.body;
            const author: number = request.user.sub;
            const Schema = { ...PostSchema, required: ['id', 'title', 'content'] };
            const validation: IValidateResponse = ValidateSchema(params, Schema);
            if (!validation.success){
                Logger.info(`End process - editPost - edit a post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Update a post
            const findPost: number = await Models.Post.count({ where: { id: params.id } });
            if (!findPost){
                Logger.info(`End process - editPost - edit a post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 404, 'Post was not found!');
            }
            const UpdatePost = await Models.Post.update(
                { ...params, updated_by: author },
                { where: { id: params.id } }
            );
            if (Array.isArray(UpdatePost) && UpdatePost.length && UpdatePost[0] === 1){
                Logger.info(`End process - editPost - edit a post - ${JSON.stringify(UpdatePost)}`);
                return hdlResponse.setResponse(response, 200, 'Post has been edited successfully!');
            } else {
                Logger.info(`End process - editPost - edit a post - ${JSON.stringify(UpdatePost)}`);
                return hdlResponse.setResponse(response, 409, 'Error post not edited!', UpdatePost);
            }
        } catch (error) {
            Logger.error('Error - editPost', error);
            Logger.info('End process - Error editPost');
            return hdlResponse.setResponse(response, 500, 'Error Post not edited, please try again!', error);
        }
    }

    public async getPosts(request: Request, response: Response) {
        try {
            Logger.info('Start process - getPosts - get list of posts');
            // 1. Get post's list
            const Posts = await Models.Post.findAll();
            if (Array.isArray(Posts) && Posts.length){
                Logger.info(`End process - getPosts - get list of posts - ${JSON.stringify(Posts)}`);
                return hdlResponse.setResponse(response, 200, 'List of posts!', Posts);
            } else {
                Logger.info(`End process - getPosts - get list of posts - ${JSON.stringify(Posts)}`);
                return hdlResponse.setResponse(response, 404, 'Posts not found!');
            }
        } catch (error) {
            Logger.error('Error - getPosts', error);
            Logger.info('End process - Error getPosts');
            return hdlResponse.setResponse(response, 500, 'Error posts not retrieved, please try again!', error);
        }
    }

    public async storeReview(request: Request | any, response: Response) {
        try {
            Logger.info('Start process - storeReview - store new review');
            // 1. Validate input parameters
            const params: IReviewInput = request.body;
            const author: number = request.user.sub;
            const validation: IValidateResponse = ValidateSchema(params, ReviewSchema);
            if (!validation.success){
                Logger.info(`End process - storeReview - store new review - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Store new review
            const findPost: number = await Models.Post.count({ where: { id: params.post_id } });
            if (!findPost){
                Logger.info(`End process - storeReview - store new review - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 404, 'Post was not found!');
            }
            const NewReview = await Models.Review.create({ ...params, created_by: author });
            if (NewReview){
                Logger.info(`End process - storeReview - store new review - ${JSON.stringify(NewReview)}`);
                return hdlResponse.setResponse(response, 200, 'Review has been stored successfully!', NewReview);
            } else {
                Logger.info(`End process - storeReview - store new review - ${JSON.stringify(NewReview)}`);
                return hdlResponse.setResponse(response, 409, 'Error review not stored!', NewReview);
            }
        } catch (error) {
            Logger.error('Error - storeReview', error);
            Logger.info('End process - Error storeReview');
            return hdlResponse.setResponse(response, 500, 'Error review not stored, please try again!', error);
        }
    }

    public async getPostById(request: Request, response: Response) {
        try {
            Logger.info('Start process - getPostById - get post details');
            // 1. Validate input parameters.
            const PostId: number = Number(request.params.id);
            const Schema: JSONSchema7 = { ...PostSchema, required: ['id'] };
            const validation: IValidateResponse = ValidateSchema({ id: PostId }, Schema);
            if (!validation.success) {
                Logger.info(`End process - getPostById - get details of post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Get details of post.
            const QueryOpt: FindOptions = {
                where: { id: PostId },
                include: [{
                    model: Models.Review,
                    required: false,
                }]
            };
            const Post = await Models.Post.findOne(QueryOpt);
            if (Post){
                Logger.info(`End process - getPostById - get post details - ${JSON.stringify(Post)}`);
                return hdlResponse.setResponse(response, 200, 'Post details!', Post);
            } else {
                Logger.info(`End process - getPostById - get post details - ${JSON.stringify(Post)}`);
                return hdlResponse.setResponse(response, 404, 'Post not found!');
            }
        } catch (error) {
            Logger.error('Error - getPostById', error);
            Logger.info('End process - Error getPostById');
            return hdlResponse.setResponse(response, 500, 'Error post details not retrieved, please try again!', error);
        }
    }

    public async deletePost(request: Request | any, response: Response) {
        try {
            Logger.info('Start process - deletePost - edit a post');
            // 1. Validate input parameters
            const PostId: number = Number(request.params.id);
            const Schema: JSONSchema7 = { ...PostSchema, required: ['id'] };
            const validation: IValidateResponse = ValidateSchema({ id: PostId }, Schema);
            const author: number = request.user.sub;
            if (!validation.success) {
                Logger.info(`End process - deletePost - delete a post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 400, 'Validation error', validation.errors);
            }
            // 2. Delete a post
            const findPost: number = await Models.Post.count({ where: { id: PostId } });
            if (!findPost){
                Logger.info(`End process - deletePost - delete a post - ${JSON.stringify(validation)}`);
                return hdlResponse.setResponse(response, 404, 'Post was not found!');
            }
            const DeletePost = await Models.Post.update(
                { deleted: 1, updated_by: author },
                { where: { id: PostId } }
            );
            await Models.Review.update(
                { deleted: 1, updated_by: author },
                { where: { post_id: PostId } }
            );
            if (Array.isArray(DeletePost) && DeletePost.length && DeletePost[0] === 1){
                Logger.info(`End process - deletePost - delete a post - ${JSON.stringify(DeletePost)}`);
                return hdlResponse.setResponse(response, 200, 'Post has been deleteed successfully!');
            } else {
                Logger.info(`End process - deletePost - delete a post - ${JSON.stringify(DeletePost)}`);
                return hdlResponse.setResponse(response, 409, 'Error post not deleteed!', DeletePost);
            }
        } catch (error) {
            Logger.error('Error - deletePost', error);
            Logger.info('End process - Error deletePost');
            return hdlResponse.setResponse(response, 500, 'Error Post not deleted, please try again!', error);
        }
    }
}