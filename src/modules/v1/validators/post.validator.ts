import { JSONSchema7 } from 'json-schema';

export const PostSchema: JSONSchema7 = {
    $id: '/posts',
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
        }, 
        content: {
            type: 'string',
            minLength: 1,
            maxLength: 500,
        }, 
    },
    required: ['title', 'content']
};

export const ReviewSchema: JSONSchema7 = {
    $id: '/review',
    type: 'object',
    additionalProperties: false,
    properties: {
        post_id: {
            type: 'integer',
            minimum: 1
        },
        review: {
            type: 'string',
            minLength: 1,
            maxLength: 500,
        },
    },
    required: ['post_id', 'review']
};

export interface IReviewInput {
    id?: number,
    post_id: number,
    review: string,
}

export interface IPostInput {
    id?: number,
    title: string,
    content: string,
    author_id: number,
}
