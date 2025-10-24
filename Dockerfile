FROM node

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run deploy-commands

CMD [ "npm", "start" ]