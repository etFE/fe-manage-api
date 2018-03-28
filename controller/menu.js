const { Menu, System, Role } = require('../model');
const errors = require('restify-errors');

// 获取
const getMenus = async (req, res, next) => {
    let result;
    try {
        result = await Menu.find();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getMenuById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Menu.findById(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 添加
const addMenu = async (req, res, next) => {
    const body = req.body;
    const menu = new Menu(body);
    let result;
    try {
        result = await menu.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateMenuById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Menu.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除
const deleteMenuById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Menu.findByIdAndRemove(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据系统获取菜单
// TODO: 查询待优化
const getMenuBySystem = async (req, res, next) => {
    const { sys } = req.params;
    let result;
    try {
        const system = await System.findOne({ name: sys });
        const role = await Role.find({ system }, { 'menus': 1, "_id": 0 });
        const menus = role.map(v => v.menus);
        const result = await Menu.find({
            _id: {
                '$in': menus.join(',').split(',')
            }
        });
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
    { path: '/menu', system: 'manage', handler: getMenus },
    { path: '/menu/:id', system: 'manage', handler: getMenuById },
    { path: '/systemMenu/:sys', system: 'manage', handler: getMenuBySystem }
];

exports.post = [
    { path: '/menu', system: 'manage', handler: addMenu },
];

exports.put = [
    { path: '/menu/:id', system: 'manage', handler: updateMenuById },
];

exports.del = [
    { path: '/menu/:id', system: 'manage', handler: deleteMenuById },
];