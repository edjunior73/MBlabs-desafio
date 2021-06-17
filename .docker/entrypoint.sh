#!/bin/bash

yarn config set cache-folder /home/node/app/.yarn-cache --global

cd /home/node/app
if [ ! -f '.env' ]; then
  cp .env.example .env
fi

yarn
yarn prisma:migrate
yarn dev
