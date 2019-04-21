const config = require('./config/default')
const app = require('./startup/app')

require('./startup/middleware')(app)
require('./src/routes')(app)
require('./startup/server')(app, config)
require('./startup/error')(app)