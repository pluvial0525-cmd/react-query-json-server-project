<<<<<<< HEAD
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
=======
FROM ubuntu:latest
LABEL authors="KW-25"

ENTRYPOINT ["top", "-b"]
>>>>>>> a7086d3d148a90eb6227c0369967145f80489a2a
