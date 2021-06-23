
FROM node:12.14-alpine3.11

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn prisma:generate

RUN yarn build

EXPOSE 5005

CMD ["yarn", "start"]
