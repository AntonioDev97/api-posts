import { DataTypes, Sequelize } from 'sequelize';

const PostModel = (sequelize: Sequelize) => sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updated_by:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    }
},{
    defaultScope: {
        attributes: { exclude: ['deleted'] },
        where: { deleted: 0 },
    }
});

export interface IPostModel {
    id?: number,
    title: string,
    content: string,
    review?: string,
    created_by: number,
    updated_by: number,
};

export default PostModel;