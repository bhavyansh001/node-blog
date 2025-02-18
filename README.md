npm i express pg dotenv body-parser

Sample env:
DB_NAME=blogdb
DB_USER=node_user
DB_PASS=somepass
DB_HOST=localhost
DB_PORT=5432


folders, files in order:
config/database.js
models/blogModel.js
controllers/blogController.js
routes/blogRoutes.js
app.js

sudo -u postgres psql
CREATE DATABASE blogdb;
CREATE USER node_user WITH PASSWORD 'somepass';
GRANT ALL PRIVILEGES ON DATABASE node_api TO node_user;
\q

psql -U node_user -d blogdb -h localhost

\c

\dt


curl -X POST http://localhost:3000/api/blogs -H "Content-Type: application/json" -d '{"title": "First Post", "body": "This is my first blog post!"}'

curl http://localhost:3000/api/blogs

curl http://localhost:3000/api/blogs/1

curl -X PUT http://localhost:3000/api/blogs/1 -H "Content-Type: application/json" -d '{"title": "Updated Title", "body": "Updated body"}'

curl -X DELETE http://localhost:3000/api/blogs/1

---

npm i ejs


views/

---

Adding Comments

config/database.js

commentModel.js

commentController.js

Routes

app.js

views


curl -X GET http://localhost:3000/api/comments/blog/1

curl -X POST \
  http://localhost:3000/api/comments/blog/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "content": "This is a test comment via curl!"
  }'

curl -X PUT \
  http://localhost:3000/api/comments/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "content": "This comment has been updated via curl!"
  }'

curl -X DELETE http://localhost:3000/api/comments/1