FROM node:carbon

WORKDIR /usr/src/app

ADD *.json *.sh ./
ADD src ./src
ADD public ./public

RUN yarn install --no-progress && \
    yarn build && \
    chgrp -R 0 . && \
    chmod -R g+rwX .

EXPOSE 3000

CMD [ "./docker-start.sh" ]
