FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    npm install -g typescript

COPY . .

RUN npm run compile

EXPOSE 3000

CMD ["npm", "start"]