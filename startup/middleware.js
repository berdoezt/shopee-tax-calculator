const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const morganBody = require('morgan-body')

module.exports = (app) => {
    // json
    app.use(express.json())
    
    // cors
    app.use(cors())
    
    // security headers
    app.use(helmet())
    
    // app logging
    morganBody(app)
}