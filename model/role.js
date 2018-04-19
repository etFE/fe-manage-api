const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 角色模型
const schema = Schema(
    {
        name: { type: String, required: true },
        descript: String,
        system: { type: ObjectId, ref: 'system' },
        menus: [{ type: ObjectId, ref: 'menu' }],
        createDate: {
            type: Date,
            default: Date.now,
            get: v => moment(v).format('YYYY-MM-DD HH:mm'),
        },
    },
    { versionKey: false }
);

schema.virtual('systemId').get(function () {
    return this.system._id || this.system;
});

schema.set('toJSON', { getters: true });

const Role = mongoose.model('role', schema, 'Role');

module.exports = Role;


