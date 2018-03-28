
const getPersons = async (req, res, next) => {
    res.send('所有人员');
    return next();
}

const getPersonById = async (req, res, next) => {
    res.send('根据id查询人员');
    return next();
}

const addPerson = async (req, res, next) => {
    res.send('添加人员信息');
    return next();
}

const updatePersonById = async (req, res, next) => {
    res.send('修改人员信息')
    return next();
}

const deletePersonById = async (req, res, next) => {
    res.send('删除人员信息')
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