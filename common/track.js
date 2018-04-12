const errors = require('restify-errors');
const moment = require('moment');
const colors = require('colors'); //控制台打印颜色
moment.locale('zh-cn'); // moment 中文

// 构建错误信息
const buildError = (req, res, err, next) => {
    const obj = new errors.bunyanSerializer(err);

    res.status(err.statusCode || 500);
    res.send({ message: obj.message, name: obj.name });
}

// 构建日志信息
const buildLog = (req, res, next) => {
    // 请求日志
    const log = `${moment(req._date).format('YYYY-MM-DD hh:mm:ss')}  <${req.connection.remoteAddress}> ${req.method}  ${req.url}`;
    if (res.err) {
        console.log(log.red);
    } else {
        console.log(log.green);
    }
}
module.exports = {
    buildError,
    buildLog
}