import { DataTypes, Sequelize } from 'sequelize';

const ReviewModel = (sequelize: Sequelize) => sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
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

export interface IReviewModel {
    id?: number,
    review: string,
    created_by: number,
    updated_by: number,
};

export default ReviewModel;