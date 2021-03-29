import { DataTypes, Sequelize } from 'sequelize';

const UserModel = (sequelize: Sequelize) => sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    token: {
        type: DataTypes.TEXT(),
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

export interface IUserModel {
    id?: number,
    name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    token?: string,
    created_by: number,
    updated_by: number,
};

export default UserModel;