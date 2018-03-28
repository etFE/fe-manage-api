const { System, Role } = require('../model');
const errors = require('restify-errors');

// 获取
const getSystems = async (req, res, next) => {
    let result;
    try {
        result = await System.find();
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getSystemById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await System.findById(id);
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 添加系统 and 添加一个管理员权限
const addSystem = async (req, res, next) => {
    const body = req.body;
    const system = new System(body);
    let result;
    try {
        result = await system.save();
        // 添加一个管理员
        const role = new Role({
            name: 'admin',
            descript: '系统管理员',
            system: result.id
        });
        await role.save();
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateSystemById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await System.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除
const deleteSystemById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await System.findByIdAndRemove(id);
        res.send({ message: "success", data: result });
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
    { path: '/sys', system: 'manage', handler: getSystems },
    { path: '/sys/:id', system: 'manage', handler: getSystemById }
];

exports.post = [
    { path: '/sys', system: 'manage', handler: addSystem },
];

exports.put = [
    { path: '/sys/:id', system: 'manage', handler: updateSystemById },
];

exports.del = [
    { path: '/sys/:id', system: 'manage', handler: deleteSystemById },
];