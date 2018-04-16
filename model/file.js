const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 文件模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        path: { type: String, required: true },
        height: { type: Number },
        expireDate: { type: Date },
        enable: { type: Number, default: 0 },
        descript: String,
        type: { type: String },
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

schema.set('toJSON', { getters: true });

const File = mongoose.model('file', schema, 'File');

module.exports = File;


