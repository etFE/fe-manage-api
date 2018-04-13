const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 用户模型
// 单一用户的角色只能是相同系统的
const schema = Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, default: '123456' },
        nick: { type: String },
        avater: String,
        descript: String,
        roles: [{ type: ObjectId, ref: 'role' }],
        createDate: {
            type: Date,
            default: Date.now,
            get: v => moment(v).format('YYYY-MM-DD HH:mm'),
        },
    },
    { versionKey: false }
);

schema.set('toJSON', { getters: true })

const User = mongoose.model('user', schema, 'User');

module.exports = User;
