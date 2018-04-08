const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// api文档模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        descript: String,
        markdown: String,
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Api = mongoose.model('api', schema, 'Api');

module.exports = Api;


