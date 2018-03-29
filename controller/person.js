
const { Person } = require('../model');
const errors = require('restify-errors');

// 获取人员信息
const getPersons = async (req, res, next) => {
    let result;
    try {
        result = await Person.find().populate(['user', 'file']);
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取人员信息
const getPersonById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Person.findById(id);
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 新增人员
const addPerson = async (req, res, next) => {
    const body = req.body;
    const person = new Person(body);
    let result;
    try {
        result = await person.save();
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改人员
const updatePersonById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await Person.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: "success", data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id删除人员
const deletePersonById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await Person.findByIdAndRemove(id);
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
    { path: '/person', system: 'manage', handler: getPersons },
    { path: '/person/:id', system: 'manage', handler: getPersonById }
];

exports.post = [
    { path: '/person', system: 'manage', handler: addPerson },
];

exports.put = [
    { path: '/person/:id', system: 'manage', handler: updatePersonById },
];

exports.del = [
    { path: '/person/:id', system: 'manage', handler: deletePersonById },
];