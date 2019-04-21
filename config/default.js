const dotenv = require('dotenv')
const env = dotenv.config({
    path:__dirname + '/../.env'
  }).parsed

module.exports = {
    port: env.PORT
}