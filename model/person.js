const mongoose = require('mongoose');
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
        adress: { type: String },
        place: { type: String },
        department: { type: ObjectId },
        user: { type: ObjectId },
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Person = mongoose.model('person', schema, 'Person');

module.exports = Person;


