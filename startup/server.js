module.exports = (app, config) => {
    var port = config.port
    app.listen(port, () => {
        console.log("Listening on port %d", port)
    })
}