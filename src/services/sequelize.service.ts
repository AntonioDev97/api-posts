import { Sequelize } from 'sequelize';
import V1UserModel from '../modules/v1/models/user.model'
import V1PermissionsModel from '../modules/v1/models/permissions.model';
import V1PostsModel from '../modules/v1/models/post.model';
import V1ReviewsModel from '../modules/v1/models/review.model';

const _Host:string = `${process.env.DB_HOST}`;
const _Port:number = Number(process.env.DB_PORT) || 3306;
const _User:string = `${process.env.DB_USER}`;
const _Pass:string = `${process.env.DB_PASS}`;
const _Database:string = `${process.env.DB_SCHEMA}`;

export const DbConfig: Sequelize = new Sequelize({
    host: _Host,
    port: _Port,
    username: _User,
    password: _Pass,
    database: _Database,
    dialect: 'mysql',
    timezone: '+00:00',
    define: { schema: _Database },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = V1UserModel(DbConfig);
const Permission = V1PermissionsModel(DbConfig);
const Post = V1PostsModel(DbConfig);
const Review = V1ReviewsModel(DbConfig);

Permission.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Permission, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'author_id' });
Review.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Review, { foreignKey: 'post_id' });

export const Models = {
    User,
    Permission,
    Post,
    Review,
}