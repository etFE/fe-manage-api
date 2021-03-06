const { Menu, System, Role, User } = require('../model');
const errors = require('restify-errors');
const _ = require('lodash');
// 获取
const getMenus = async (req, res, next) => {
    // 查询条件
    const { name, system } = req.query;
    const query = {};
    if (name)
        query.name = { '$regex': name };
    if (system)
        query.system = system;

    let result;
    try {
        result = await Menu.find(query).populate(['system']);
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

const getUserMenu = async (req, res, next) => {
    const username = req.get('currentUser');
    let result;
    try {
        result = await User.findOne({ username }, { roles: 1 })
            .populate({
                path: 'roles',
                populate: {
                    path: 'menus'
                }
            });
        result = _.map(result.roles, 'menus');
        result = _.flattenDeep(result);
        result = _.uniqBy(result, 'name').map(v => v.name);
        res.send({ message: 'success', data: result })
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
        const newMenu = await menu.save();
        result = await Menu.findById(newMenu).populate(['system']);
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
        result = await Menu.findByIdAndUpdate(id, body, { new: true }).populate(['system']);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id设置系统
const updateSystemById = async (req, res, next) => {
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
// const getMenuBySystem = async (req, res, next) => {
//     const { sys } = req.params;
//     let result;
//     try {
//         const system = await System.findOne({ name: sys });
//         const role = await Role.find({ system }, { 'menus': 1, "_id": 0 });
//         const menus = role.map(v => v.menus);
//         const result = await Menu.find({
//             _id: {
//                 '$in': menus.join(',').split(',')
//             }
//         });
//         res.send({ message: 'success', data: result });
//     } catch (error) {
//         return next(error);
//     }
//     return next();
// }

// 根据系统id获取
const getMenuBySystemId = async (req, res, next) => {
    const { sysId } = req.params;
    let result;
    try {
        result = await Menu.find({ system: sysId });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 获取组件项目菜单
const pluginMenu = async (req, res, next) => {
    let result;
    try {
        const system = await System.findOne({ name: 'plugin' });
        result = await Menu.find({ system: system });
        result = result.map(v => ({ id: v.name, text: `${v.name} ${v.text}` }));
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 设置菜单包含文件
const setMenuFileById = async (req, res, next) => {
    const { id } = req.params;
    const { files } = req.body;
    let result;
    try {
        const result = await Menu.findByIdAndUpdate(id, {
            "$addToSet": {
                "files": { '$each': files }
            }
        }, { new: true });
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
    { path: '/user_menu', system: 'manage', handler: getUserMenu },
    { path: '/menu/:id', system: 'manage', handler: getMenuById },
    { path: '/system_menu/:sysId', system: 'manage', handler: getMenuBySystemId },
    { path: '/menu', system: 'front', handler: pluginMenu }
];

exports.post = [
    { path: '/menu', system: 'manage', handler: addMenu },
];

exports.put = [
    { path: '/menu/:id', system: 'manage', handler: updateMenuById },
    { path: '/menu/:id/setSystem', system: 'manage', handler: updateSystemById },
    { path: '/menu/:id/setFile', system: 'manage', handler: setMenuFileById }
];

exports.del = [
    { path: '/menu/:id', system: 'manage', handler: deleteMenuById },
];