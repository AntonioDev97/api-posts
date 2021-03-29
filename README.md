## API-POSTS

### Architecture
SOLID Singleton architecture with 3 layers

### Patron Design
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