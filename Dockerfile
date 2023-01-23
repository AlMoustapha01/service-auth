FROM node:14

WORKDIR /prod

COPY ./prod ./

EXPOSE 3000

CMD NODE_ENV=${NODE_ENV} && node dist/src/main.js