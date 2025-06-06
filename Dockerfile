# Dockerfile
FROM node:21-alpine

WORKDIR /project
COPY . .

RUN npm install

CMD ["make", "test"]
