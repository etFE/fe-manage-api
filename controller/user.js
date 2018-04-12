const { User } = require('../model');
const { generateToken } = require('../common/pem')
const errors = require('restify-errors');

// 获取
const getUsers = async (req, res, next) => {
    let result;
    try {
        result = await User.find().populate('roles');
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getUserById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await User.findById(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 新建
const addUser = async (req, res, next) => {
    const body = req.body;
    const user = new User(body);
    let result;
    try {
        result = await user.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await User.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id分配role
const setUserRoleById = async (req, res, next) => {
    const { id } = req.params;
    const { roles } = req.body;
    let result;
    try {
        const result = await User.findByIdAndUpdate(id, {
            "$addToSet": {
                "roles": { '$each': roles }
            }
        }, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除
const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await User.findByIdAndRemove(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 登录
const login = async (req, res, next) => {
    const { body } = req
    const token = generateToken(body)
    let result
    try {
        result = await User.find(body).populate('roles');
        if (result.length === 0) {
            res.send({ message: '账号或密码错误', error: true, data: result });
        } else {
            res.send({ message: '登录成功', data: result, token });
        }
    } catch (error) {
        return next(error)
    }
    return next()
}

// 已登录用户信息获取
const getUserInfo = async (req, res, next) => {

    try {
        const result = {
            nick: 'cl',
            username: 'admin',
            password: 'admin123',
            avatar: 'http://on0m38azq.bkt.clouddn.com/17-10-18/63768488.jpg',
        }
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error)
    }
    return next()
}

/**
 * 对外接口
 * 格式：
 * ${system}${path}
 */
exports.get = [
    { path: '/user', system: 'manage', handler: getUsers },
    { path: '/user/info', system: 'manage', handler: getUserInfo },
    { path: '/user/:id', system: 'manage', handler: getUserById }
];

exports.post = [
    { path: '/user', system: 'manage', handler: addUser },
    { path: '/user/login', system: 'manage', handler: login },
];

exports.put = [
    { path: '/user/:id', system: 'manage', handler: updateUserById },
];

exports.del = [
    { path: '/user/:id', system: 'manage', handler: deleteUserById },
];