import { DataTypes, Sequelize } from 'sequelize';

const PermissionModel = (sequelize: Sequelize) => sequelize.define('permissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    module: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    permission: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(150),
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }
},{
    defaultScope: {
        attributes: { exclude: ['deleted'] },
        where: { deleted: 0 },
    }
});

export default PermissionModel;