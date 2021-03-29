
USE posts;

INSERT INTO posts.`posts.users` (name,last_name,email,username,password,token,created_by,updated_by,deleted,createdAt,updatedAt) 
VALUES ('user test admin','lastname test','admin@gmail.com','admin','$2b$10$NvoZjhvW4XDo/UDgfy0ZC.1zPtixonLGc7kv/YdIRtFwSP4AJfeqW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJ1c2VyIHRlc3QgYWRtaW4iLCJsYXN0X25hbWUiOiJsYXN0bmFtZSB0ZXN0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjE3MDQyMjczLCJleGQiOjE2MTcwNDk0NzMsImV4cCI6MTYxNzA0OTQ3M30.6ZxxyibrIShFB5zjLFmkxTgE7SoWUDs62oO738i8Bg8',1,NULL,0,'2021-03-29 18:23:57','2021-03-29 18:24:33');

INSERT INTO posts.`posts.permissions` (module,permission,user_id,description,created_by,updated_by,deleted,createdAt,updatedAt) 
VALUES ('users','create',1,'user can create new users',1,NULL,0,'2021-03-29 18:23:57','2021-03-29 18:23:57'),
	   ('users','view',1,'user can view users',1,NULL,0,'2021-03-29 18:23:57','2021-03-29 18:23:57'),
	   ('users','edit',1,'user can edit users',1,NULL,0,'2021-03-29 18:23:57','2021-03-29 18:23:57'),
	   ('users','delete',1,'user can delete users',1,NULL,0,'2021-03-29 18:23:57','2021-03-29 18:23:57');