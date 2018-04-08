const { Api } = require('../model');
const errors = require('restify-errors');

// 获取
const getApis = async (req, res, next) => {
    let result;
    try {
        result = await Api.find();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getLogById = async (req, res, next) => {

}

// 新增
const addApi = async (req, res, next) => {
    const body = req.body;
    const api = new Api(body);
    let result;
    try {
        result = await api.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateLogById = async (req, res, next) => {

}

// 根据id删除
const deleteLogById = async (req, res, next) => {

}

/**
 * 对外接口
 * 格式：
 * ${system}${path}
 */
exports.get = [
    { path: '/api', system: 'manage', handler: getApis },
    // { path: '/log/:id', system: 'manage', handler: getLogById }
];

exports.post = [
    { path: '/api', system: 'manage', handler: addApi },
];

exports.put = [
    // { path: '/log/:id', system: 'manage', handler: updateLogById },
];

exports.del = [
    // { path: '/log/:id', system: 'manage', handler: deleteLogById },
];