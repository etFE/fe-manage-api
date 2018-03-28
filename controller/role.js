const { Role } = require('../model');
const errors = require('restify-errors');

// 获取
const getRoles = async (req, res, next) => {
    let result;
    try {
        result = await Role.find({}, { _id: 0 }).populate(['system', 'menus']);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getRoleById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Role.findById(id).populate('system');
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 添加一条
const addRole = async (req, res, next) => {
    const body = req.body;
    const role = new Role(body);
    let result;
    try {
        result = await role.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改一条
const updateRoleById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Role.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id分配menu
const setRoleMenuById = async (req, res, next) => {
    const { id } = req.params;
    const { menus } = req.body;
    let result;
    try {
        const result = await Role.findByIdAndUpdate(id, {
            "$addToSet": {
                "menus": { '$each': menus }
            }
        }, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除一条
const deleteRoleById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Role.findByIdAndRemove(id);
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
    { path: '/role', system: 'manage', handler: getRoles },
    { path: '/role/:id', system: 'manage', handler: getRoleById }
];

exports.post = [
    { path: '/role', system: 'manage', handler: addRole },
];

exports.put = [
    { path: '/role/:id', system: 'manage', handler: updateRoleById },
    { path: '/role/:id/setMenu', system: 'manage', handler: setRoleMenuById }
];

exports.del = [
    { path: '/role/:id', system: 'manage', handler: deleteRoleById },
];


