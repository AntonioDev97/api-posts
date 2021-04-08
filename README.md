## API-POSTS

### Architecture
SOLID Singleton architecture with 3 layers / MCM / Monolitic

### Structure files
📦api-posts <br />
 ┣ 📂src <br />
 ┃ ┣ 📂middlewares <br />
 ┃ ┃ ┣ 📜apikey.middleware.ts <br />
 ┃ ┃ ┗ 📜authentication.middleware.ts <br />
 ┃ ┣ 📂modules <br />
 ┃ ┃ ┗ 📂v1 <br />
 ┃ ┃ ┃ ┣ 📂controllers <br />
 ┃ ┃ ┃ ┃ ┣ 📜post.controller.ts <br />
 ┃ ┃ ┃ ┃ ┗ 📜user.controller.ts <br />
 ┃ ┃ ┃ ┣ 📂interfaces <br />
 ┃ ┃ ┃ ┃ ┗ 📜request.interface.ts <br />
 ┃ ┃ ┃ ┣ 📂middlewares <br />
 ┃ ┃ ┃ ┃ ┣ 📜post.middleware.ts <br />
 ┃ ┃ ┃ ┃ ┗ 📜user.middleware.ts <br />
 ┃ ┃ ┃ ┣ 📂models <br />
 ┃ ┃ ┃ ┃ ┣ 📜permissions.model.ts <br />
 ┃ ┃ ┃ ┃ ┣ 📜post.model.ts <br /> 
 ┃ ┃ ┃ ┃ ┗ 📜user.model.ts <br />
 ┃ ┃ ┃ ┣ 📂routes <br />
 ┃ ┃ ┃ ┃ ┣ 📜post.route.ts <br />
 ┃ ┃ ┃ ┃ ┗ 📜user.route.ts <br />
 ┃ ┃ ┃ ┣ 📂test <br />
 ┃ ┃ ┃ ┃ ┣ 📜post.test.ts <br />
 ┃ ┃ ┃ ┗ 📂validators <br />
 ┃ ┃ ┃ ┃ ┗ 📜user.validator.ts <br />
 ┃ ┣ 📂services <br />
 ┃ ┃ ┣ 📜jwt.service.ts <br />
 ┃ ┃ ┣ 📜response-handler.service.ts <br />
 ┃ ┃ ┣ 📜sequelize.service.ts <br />
 ┃ ┃ ┣ 📜validator.service.ts <br />
 ┃ ┃ ┗ 📜winston.service.ts <br />
 ┃ ┣ 📂utils <br />
 ┃ ┃ ┗ 📜logger.util.ts <br />
 ┃ ┗ 📜app.ts <br />
 ┣ 📜.env <br />
 ┣ 📜.gitignore <br />
 ┣ 📜README.md <br />
 ┣ 📜index.ts <br />
 ┣ 📜nodemon.json <br />
 ┣ 📜package-lock.json <br />
 ┣ 📜package.json <br />
 ┗ 📜tsconfig.json <br />

## Requirements
NodeJS Version: 14.15.4 <br />
NPM Version: 6.14.10 <br />
MYSQL Version: 8.0.23 <br />


## Steps

1. Install NodeJS and MYSQL Server
2. Set enviroment variables configuration
    - `./.env`
2. Install dependencies
    - `npm install`
3. Create Database 
    - Run `CREATE DATABASE IF NOT EXISTS posts;` Script into MYSQL Server
4. Run project
    - `npm run dev` (This command automatically CREATES the necessary TABLES into DATABASE) this mode is developer mode if you need to run in production mode please check section "Build and run in JavaScript"
5. Run seed file Script into MYSQL Server
    - `./seed.sql` (This script inserts default data)
6. You can do requests to API (check down user admin credentials)
    - You can find the postman collection at `./API_POSTS.postman_collection.json`
    - You can import the postman enviroment at `./POSTS-LOCAL.postman_environment.json`
    - First do login -> /login (credentiales are down).

## Build and run in JavaScript
- Transform TypeScript to JavaScript with: `npm run build` this will create a folder `./dist` with project in JavaScript<br />
- Run project in JavaScript with `npm start`<br />
## Unit Test
Run unit test: <br />
    - start test: `npm run test`<br />
    - generate coverage report: `npm run test-report`<br />
You can find the coverage report at `./coverage` once generated<br />

## Admin Credentials
username: admin <br />
password: admin123
## Notes:
- This is a base structure project and continue in development.<br />
- This effort took about 22 Hours.<br />
- Unit Tests are in progress but someones are ready!.<br />