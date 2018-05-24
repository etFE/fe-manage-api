const { User } = require('../model');
const { generateToken } = require('../common/pem')
const errors = require('restify-errors');

// 获取
const getUsers = async (req, res, next) => {
    // 查询条件
    const query = {};
    const { username, nick } = req.query;
    if (username)
        query.username = { '$regex': username };
    if (nick)
        query.nick = { '$regex': nick };

    let result;
    try {
        result = await User.find(query);
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
    body.nick = body.nick || body.username

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
            "$set": { roles }
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
    const token = generateToken({ username: body.username })
    let result
    try {
        result = await User.findOne(body).populate('roles');
        if (!result || result.length === 0) {
            res.send({ message: 'success', error: '账号或密码错误', data: result });
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
    const currentUser = req.get('currentUser')

    try {
        const result = await User.findOne({ username: currentUser })

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
    { path: '/user/:id/setRole', system: 'manage', handler: setUserRoleById },
];

exports.del = [
    { path: '/user/:id', system: 'manage', handler: deleteUserById },
];