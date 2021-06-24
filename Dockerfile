# development stage
FROM node:14-alpine AS dev-stage

WORKDIR /srv

COPY ./package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD [ "npm", "run", "dev" ]

# build stage
FROM dev-stage AS build-stage

RUN npm run build

RUN rm -rf node_modules

RUN npm install --production

# production stage
FROM node:14-alpine AS production-stage

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv

COPY --from=build-stage /srv /srv

CMD [ "npm", "start"]
