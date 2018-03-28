const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 用户模型
// 单一用户的角色只能是相同系统的
const schema = Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, default: '123456' },
        descript: String,
        roles: [{ type: ObjectId, ref: 'role' }],
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const User = mongoose.model('user', schema, 'User');

module.exports = User;


