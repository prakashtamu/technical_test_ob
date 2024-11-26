FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g next
RUN npm install
COPY . .
RUN npm run build 