const { Api, Menu } = require('../model');
const errors = require('restify-errors');

// 获取
const getApis = async (req, res, next) => {
    let result;
    try {
        // result = await Api.find();
        const result = await Menu.find({ "api": { "$ne": undefined } });
        // result = menuAndApi.map((menu) => {
        //     if (menu.api)
        //         return menu.api;
        // });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 获取没有文档的菜单
const getEmptyMenu = async (req, res, next) => {
    let result;
    try {
        const result = await Menu.find({ "api": undefined });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getApiById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Api.findById(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
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
const updateApiById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Api.findByIdAndUpdate(id, {
            "$set": body
        }, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据name修改
const updateApiByName = async (req, res, next) => {
    const { name } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Api.findOneAndUpdate({ name: name }, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        next(error);
    }
    return next();
}

// 根据id删除
const deleteApiById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Api.findByIdAndRemove(id);
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
    { path: '/api', system: 'manage', handler: getApis },
    { path: '/api/:id', system: 'manage', handler: getApiById },
    { path: '/api/getEmptyMenu', system: 'manage', handler: getEmptyMenu }
];

exports.post = [
    { path: '/api', system: 'manage', handler: addApi },
];

exports.put = [
    { path: '/api/:id', system: 'manage', handler: updateApiById },
    { path: '/api/:name/update', system: 'manage', handler: updateApiByName }
];

exports.del = [
    { path: '/api/:id', system: 'manage', handler: deleteApiById },
];