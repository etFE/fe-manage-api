const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const system = {
    plugin: 'plugin',
    manage: 'manage',
    application:'application'
}

// 所有接口
const api_list = {
    get: [],
    post: [],
    put: [],
    del: []
};
let initMethod = (method, _name) => {
    Object.keys(method).forEach((type) => {
        let apiArr = method[type].map((v) => ({ path: `/${system[v.system]}${v.path}`, handler: v.handler }));
        api_list[type].push(...apiArr);
    });
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        var modules = require(path.join(__dirname, file));
        initMethod(modules);
    });

module.exports = api_list;
