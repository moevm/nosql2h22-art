FROM node:12-alpine as build
WORKDIR /frontend
COPY package.json /app/package.json
RUN npm install --only=prod
RUN npm install -g serve
CMD serve -s build
COPY . /frontend
EXPOSE 3000