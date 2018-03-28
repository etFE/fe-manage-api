const { Log } = require('../model');
const moment = require('moment');
const errors = require('restify-errors');

// 获取
const getLogs = async (req, res, next) => {
    const { date } = req.query;
    let query = {}
    if (date) {
        query.createDate = {
            "$gte": moment(date).utc(true),
            "$lt": moment(date).utc(true).add(1, 'days')
        }
    }
    let result;
    try {
        result = await Log.find(query);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getLogById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Log.findById(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 新增
const addLog = async (req, res, next) => {
    const body = req.body;
    const log = new Log(body);
    let result;
    try {
        result = await log.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateLogById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Log.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除
const deleteLogById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Log.findByIdAndRemove(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

/**
 * 对外接口
 * 格式：
 * ${system}${path}
 */
exports.get = [
    { path: '/log', system: 'manage', handler: getLogs },
    // { path: '/log/:id', system: 'manage', handler: getLogById }
];

exports.post = [
    // { path: '/log', system: 'manage', handler: addLog },
];

exports.put = [
    // { path: '/log/:id', system: 'manage', handler: updateLogById },
];

exports.del = [
    // { path: '/log/:id', system: 'manage', handler: deleteLogById },
];