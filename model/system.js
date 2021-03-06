const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 系统模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        descript: String,
        createDate: {
            type: Date,
            default: Date.now,
            get: v => moment(v).format('YYYY-MM-DD HH:mm'),
        },
    },
    { versionKey: false }
);

schema.set('toJSON', { getters: true });

const System = mongoose.model('system', schema, 'System');

module.exports = System;


