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
        address: { type: String },
        place: { type: String },
        avatar: { type: ObjectId, ref: 'file' },
        department: { type: ObjectId, ref: 'department' },
        user: { type: ObjectId, ref: 'user' },
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);
// schema.virtual('age').get(() => {
//     return this.birthday
// });
// schema.set('toJSON', { getters: true });
const Person = mongoose.model('person', schema, 'Person');

module.exports = Person;


