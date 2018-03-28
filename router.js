const { get, post, put, del } = require('./controller');
const controller = require('./controller');

exports.route = (server) => {
    console.log('======================接口======================')
    Object.keys(controller).forEach((method) => {
        controller[method].forEach((api) => {
            console.log(method, api.path);
            server[method](api.path, api.handler);
        });
    });
    console.log('================================================')
}

