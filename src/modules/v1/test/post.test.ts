import httpMocks from 'node-mocks-http';
import { DbConfig, Models } from '../../../../src/services/sequelize.service';
import { Request, Response } from 'express';
import { PostController } from '../controllers/post.controller';

jest.mock('../../../../src/services/sequelize.service');
describe('Posts module tests', () => {
    const Post = new PostController();
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    describe('Method storePost test cases', () => {
        test('Return successfully response when post have been created', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'POST',
                url: '/posts',
                user: { sub: 1 },
                body: {
                    "title": "Second Post",
                    "content": "This is a test content"
                }
            });
            const mockResultData = {
                deleted: 0,
                id: 3,
                title: 'Second Post',
                content: 'This is a test content',
                author_id: 1,
                created_by: 1,
                updatedAt: '2021-04-08T05:04:21.564Z',
                createdAt: '2021-04-08T05:04:21.564Z'
            }
            const expectedResponse = {
                status: 200,
                type: 'success',
                error: false,
                message: 'Post has been stored successfully!',
                data: mockResultData
              }
            //@ts-ignore
            Models.Post.create = jest.fn(() => mockResultData);
            const result: any =  await Post.storePost(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.create).toHaveBeenCalledTimes(1);
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 200);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });

        test('Return error response with invalid title parameter', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'POST',
                url: '/posts',
                user: { sub: 1 },
                body: {
                    "title": 123,
                    "content": "This is a test content"
                }
            });

            const expectedResponse = {
                status: 400,
                type: 'Bad request',
                error: true,
                errorDesc: [{
                    property: 'title',
                    message: '123 - number value found, but a string is required'
                }],
                message: 'Validation error'
            }
            const result: any =  await Post.storePost(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.create).not.toHaveBeenCalled();
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 400);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });

        test('Return error response with invalid content parameter', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'POST',
                url: '/posts',
                user: { sub: 1 },
                body: {
                    title: 'Second Post',
                    content: 123
                }
            });

            const expectedResponse = {
                status: 400,
                type: 'Bad request',
                error: true,
                errorDesc: [{
                    property: 'content',
                    message: '123 - number value found, but a string is required'
                }],
                message: 'Validation error'
            }
            const result: any =  await Post.storePost(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.create).not.toHaveBeenCalled();
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 400);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });

        test('Return error response when post does not created', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'POST',
                url: '/posts',
                user: { sub: 1 },
                body: {
                    "title": "Second Post",
                    "content": "This is a test content"
                }
            });
            const mockResultData = false;
            const expectedResponse = {
                status: 409,
                type: 'Conflict',
                error: true,
                message: 'Error post not stored!',
              }
            //@ts-ignore
            Models.Post.create = jest.fn(() => mockResultData);
            const result: any =  await Post.storePost(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.create).toHaveBeenCalledTimes(1);
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 409);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });
    });

    describe('Method getPostById test cases', () => {
        test('Return successfully response when post have been retrieved', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'GET',
                url: '/posts/:id',
                params: { id: 1 }
            });
            const mockResultData = {
                id: 3,
                title: 'Second Post',
                author_id: 1,
                content: 'This is a test content',
                created_by: 1,
                updated_by: null,
                createdAt: '2021-04-08T05:04:21.000Z',
                updatedAt: '2021-04-08T05:04:21.000Z',
                reviews: [{
                    id: 3,
                    post_id: 3,
                    review: 'This is my first review',
                    created_by: 1,
                    updated_by: null,
                    createdAt: '2021-04-08T05:22:28.000Z',
                    updatedAt: '2021-04-08T05:22:28.000Z'
                }]
            }
            const expectedResponse = {
                status: 200,
                type: 'success',
                error: false,
                message: 'Post details!',
                data: mockResultData
            }
            //@ts-ignore
            Models.Post.findOne = jest.fn(() => mockResultData);
            const result: any =  await Post.getPostById(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.findOne).toHaveBeenCalledTimes(1);
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 200);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });

        test('Return error response with invalid id parameter', async () => {
            const mockResponse: Response = httpMocks.createResponse();
            const mockRequest: Request = httpMocks.createRequest({
                method: 'GET',
                url: '/posts/:id',
                params: { id: 'invalid' }
            });
            const expectedResponse = {
                status: 400,
                type: 'Bad request',
                error: true,
                errorDesc: [{
                    property: 'id',
                    message: 'NaN - number value found, but a integer is required'
                }],
                message: 'Validation error'
            }
            
            const result: any =  await Post.getPostById(mockRequest, mockResponse);
            const response = result._getData();
            expect(Models.Post.findOne).not.toHaveBeenCalled();
            expect(response.constructor).toBe(Object);
            expect(response).toHaveProperty('status', 400);
            expect(response).toHaveProperty('type', expectedResponse.type);
            expect(response).toMatchObject(expectedResponse);
        });
    });
});