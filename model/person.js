const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 人员模型
const schema = Schema(
    {
        name: { type: String },
        nick: { type: String },
        sex: { type: Number },
        birthday: { type: Date },
        phone: { type: String },
        email: { type: String },
        address: { type: String },
        place: { type: String },
        avatar: { type: ObjectId, ref: 'file' },
        department: { type: ObjectId, ref: 'department' },
        user: { type: ObjectId, ref: 'user' },
        createDate: {
            type: Date,
            default: Date.now,
            get: v => moment(v).format('YYYY-MM-DD HH:mm'),
        },
    },
    { versionKey: false }
);
schema.virtual('age').get(function () {
    if (this.birthday)
        return moment().diff(moment(this.birthday), 'years');
    else
        return '--';
});

schema.virtual('sexStr').get(function () {
    const _sex = this.sex;
    return _sex === 0 ? '男' : _sex === 1 ? '女' : '未填写';
});

schema.set('toJSON', { getters: true });

const Person = mongoose.model('person', schema, 'Person');

module.exports = Person;


