## API-POSTS

### Architecture
SOLID Singleton architecture with 3 layers

### Patron design
MCM

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
 ┃ ┃ ┃ ┃ ┗ 📜user.tetst.ts <br />
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
NodeJS Version: 14.15.4
NPM Version: 6.14.10
MYSQL Version: 8.0.23


## Steps

1. Install NodeJS and MYSQL Server
2. Install dependencies
    - `npm install`
3. Create Database 
    - Run `CREATE DATABASE IF NOT EXISTS posts;` Script into MYSQL Server
4. Run project
    - `npm run dev` (This command automatically creates the necessary tables into database)
5. Run seed file Script into MYSQL Server
    - `./seed.sql` (This script inserts default data)
6. You can do requests to API (check above user admin credentials)

## Admin Credentials
username: admin
password: admin123
## Notes:
- This is a base structure project and continue in development.
- This effort took about 12 Hours.
- Unit Tests are going to implement with JEST.