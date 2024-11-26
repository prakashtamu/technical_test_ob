FROM node:22.11.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
RUN yarn && yarn add next
COPY . .
RUN npm run build 