FROM node:12-alpine as build
WORKDIR /frontend
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /frontend
EXPOSE 3000