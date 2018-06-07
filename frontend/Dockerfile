FROM node:carbon

WORKDIR /usr/src/app

ADD *.json ./
ADD src ./src
ADD public ./public

RUN yarn install --no-progress && \
    yarn build

EXPOSE 3000

CMD [ "yarn", "demo" ]
