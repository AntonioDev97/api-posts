## API-POSTS

### Architecture
SOLID Singleton architecture with 3 layers

### PATRON DESIGN
MCM

### Structure files
📦api-posts
 ┣ 📂src
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜apikey.middleware.ts
 ┃ ┃ ┗ 📜authentication.middleware.ts
 ┃ ┣ 📂modules
 ┃ ┃ ┗ 📂v1
 ┃ ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┃ ┣ 📜post.controller.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.controller.ts
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜request.interface.ts
 ┃ ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┃ ┣ 📜post.middleware.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.middleware.ts
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📜permissions.model.ts
 ┃ ┃ ┃ ┃ ┣ 📜post.model.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.model.ts
 ┃ ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┃ ┣ 📜post.route.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.route.ts
 ┃ ┃ ┃ ┣ 📂test
 ┃ ┃ ┃ ┃ ┣ 📜post.test.ts
 ┃ ┃ ┃ ┃ ┗ 📜user.tetst.ts
 ┃ ┃ ┃ ┗ 📂validators
 ┃ ┃ ┃ ┃ ┗ 📜user.validator.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜jwt.service.ts
 ┃ ┃ ┣ 📜response-handler.service.ts
 ┃ ┃ ┣ 📜sequelize.service.ts
 ┃ ┃ ┣ 📜validator.service.ts
 ┃ ┃ ┗ 📜winston.service.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜logger.util.ts
 ┃ ┗ 📜app.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜index.ts
 ┣ 📜nodemon.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json