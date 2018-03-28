const fs = require('fs');
const path = require('path');
const errors = require('restify-errors');
const { File } = require('../model');

// 获取
const getFiles = async (req, res, next) => {
    let result;
    try {
        result = await File.find();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id获取
const getFileById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await File.findById(id);
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 新增
const addFile = async (req, res, next) => {
    const body = req.body;
    const file = new File(body);
    let result;
    try {
        result = await file.save();
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 根据id修改
const updateFileById = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    let result;
    try {
        result = await File.findByIdAndUpdate(id, body, { new: true });
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 删除物理文件
const deleteFile = (path) => {
    fs.exists(path, (exists) => {
        if (exists) fs.unlinkSync(path);
    });
}
// 根据id删除
const deleteFileById = async (req, res, next) => {
    const { id } = req.params;
    let result;
    try {
        result = await File.findByIdAndRemove(id);
        if (result) {
            const path = `${process.cwd()}/static/upload/${result.path}`;
            deleteFile(path);
        }
        res.send({ message: 'success', data: result });
    } catch (error) {
        return next(error);
    }
    return next();
}

// 上传文件
const uploadFile = async (req, res, next) => {
    const { file } = req.files;
    try {
        const name = file['name'];
        const tmpath = file['path'];
        const tmparr = name.split('.');
        const ext = tmparr[tmparr.length - 1];
        const newfile = `${parseInt(Math.random() * 100)}${Date.parse(new Date()).toString()}.${ext}`;
        const newpath = path.join(`${process.cwd()}/static/upload`, newfile);
        // 创建一个可写流
        const stream = fs.createWriteStream(newpath);
        // // 可读流通过管道写入可写流
        fs.createReadStream(tmpath).pipe(stream);

        const model = new File({
            name,
            path: newfile,
            descript: name,
            type: ext
        });
        const result = await model.save();
        res.send(result);
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
    { path: '/file', system: 'manage', handler: getFiles },
    { path: '/file/:id', system: 'manage', handler: getFileById }
];

exports.post = [
    // { path: '/file', system: 'manage', handler: addFile },
    { path: '/file/upload', system: 'manage', handler: uploadFile }
];

exports.put = [
    { path: '/file/:id', system: 'manage', handler: updateFileById },
];

exports.del = [
    { path: '/file/:id', system: 'manage', handler: deleteFileById },
];