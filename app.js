const restify = require('restify');
const errors = require('restify-errors');
const compression = require('compression');
const router = require('./router');
const moment = require('moment');
const colors = require('colors'); //控制台打印颜色
moment.locale('zh-cn'); // moment 中文

// 服务创建
const server = restify.createServer({
    name: 'manage-api',
    version: '0.0.0',
});

// 压缩文件
server.use(compression());

// 跨域
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

server.opts('*', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.end();
    return next();
});

server.use(restify.plugins.queryParser());

server.use(restify.plugins.bodyParser());

// 匹配路由前执行
server.pre((req, res, next) => {
    return next();
});

// 获取上传的静态资源
server.get('/upload/*', restify.plugins.serveStatic({
    directory: './static/upload',
    appendRequestPath: false,
}));

//加載接口路由
router.route(server);

// 首页路由
server.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(`
        <h1>项目启动成功！</h1>
    `);
    res.end();
    return next();
});

// 匹配路由后执行
server.on('after', (req, res, next) => {
    // 请求日志
    const log = `${moment(req._date).format('YYYY-MM-DD hh:mm:ss')}  <${req.connection.remoteAddress}> ${req.method}  ${req.url}`;
    if (res.err) {
        console.log(log.red);
    } else {
        console.log(log.green);
    }
});

// 错误处理
server.on("restifyError", (req, res, err, next) => {
    const { message, name } = new errors.bunyanSerializer(err);
    res.send({ message, name });
});

// 监听项目
server.listen(3000, () => {
    console.log("%s listening at %s", server.name, server.url);
});