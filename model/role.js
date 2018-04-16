const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 角色模型
const schema = Schema(
    {
        name: { type: String, required: true },
        descript: String,
        system: { type: ObjectId, ref: 'system' },
        menus: [{ type: ObjectId, ref: 'menu' }],
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

schema.set('toJSON', { getters: true });

const Role = mongoose.model('role', schema, 'Role');

module.exports = Role;


