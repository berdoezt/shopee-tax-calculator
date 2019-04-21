module.exports = (app) => {
    const error = require('./error')
    const bill = require('./controller/bill')

    app.use('/bills', bill)
    app.use(error)
}