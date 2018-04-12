const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const compression = require('compression');

const { buildError, buildLog } = require('./common/track');
const router = require('./router');

// 服务创建
const server = restify.createServer({
    name: 'manage-api',
    version: '0.0.0',
});

// 压缩文件
server.use(compression());

// 跨域
const cors = corsMiddleware({
    origins: ['*']
});
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// 匹配路由前执行
server.use((req, res, next) => {
    const { method, headers, url } = req

    if (method !== 'OPTIONS' && method !== 'GET' && url !== '/manage/user/login') {
        if (headers.Authorization) {
            const token = headers.Authorization.split(' ')[1]
            const result = verifyToken(token)

            if (result) {
                return next();
            }
        }
        res.send({ message: '没有操作权限', error: true, data: {} });
    }
    return next();
});

// 获取上传的静态资源
server.get('/upload/*', restify.plugins.serveStatic({
    directory: './static/upload',
    appendRequestPath: false,
}));


//加載接口路由
router.route(server);
// 匹配路由后执行
server.on('after', buildLog);
// 错误处理
server.on('restifyError', buildError);

// 监听项目
server.listen(3000, () => {
    console.log("%s listening at %s", server.name, server.url);
});