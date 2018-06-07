FROM node:carbon

WORKDIR /usr/src/app

ADD package.json initial-data.json ./

RUN yarn install

ADD ./src ./src

EXPOSE 3005
CMD [ "yarn", "start" ]
