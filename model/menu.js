const mongoose = require('mongoose');
const moment = require('moment');
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

const Menu = mongoose.model('menu', schema, 'Menu');

module.exports = Menu;
