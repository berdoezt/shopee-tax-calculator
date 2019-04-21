module.exports = (req, res, next) => {
    var error = new Error();
    error.message = "Not found"
    error.status = 404

    next(error)
}