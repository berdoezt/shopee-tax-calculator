FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

# install all library and dependencies
RUN npm install

COPY . .

# initialize sequelize
RUN node_modules/.bin/sequelize init

# migrate database
RUN node_modules/.bin/sequelize db:migrate

# seeding data
RUN node_modules/.bin/sequelize db:seed:all

# port use
EXPOSE 3000

# command to start
CMD [ "npm", "start" ]