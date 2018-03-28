const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 日志模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        message: { type: String },
        user: { type: ObjectId, ref: 'user' },
        ip: { type: ObjectId },
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Log = mongoose.model('log', schema, 'Log');

module.exports = Log;


