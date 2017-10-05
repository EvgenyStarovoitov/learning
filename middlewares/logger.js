
exports.logger = function (req, res, next) {
    console.log('log');
    next();
};