const dotenv = require('dotenv')
const env = dotenv.config({
  path:__dirname + '/../.env'
}).parsed

module.exports = {
  "development": {
    "username": env.DB_USER,
    "password": env.DB_PASS,
    "database": env.DB,
    "host": env.DB_HOST,
    "dialect": env.DB_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
