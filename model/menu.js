const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 菜单模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        text: { type: String },
        files: [{ type: ObjectId, ref: 'file' }],
        descript: { type: String },
        api: { type: ObjectId, ref: 'api' },
        system: { type: ObjectId, ref: 'system' },
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Menu = mongoose.model('menu', schema, 'Menu');

module.exports = Menu;
