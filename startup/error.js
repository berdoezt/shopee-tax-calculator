module.exports = (app) => {
    app.use((err, req, res, next) => {
        var body = {
            error: true,
            message: err.message
        }

        res.status(err.status || 500).send(body)
    })
}