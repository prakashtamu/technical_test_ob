FROM node:22.11.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn && yarn add next
COPY . .
RUN npm run build 