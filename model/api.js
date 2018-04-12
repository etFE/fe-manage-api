const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// api文档模型
const schema = Schema(
    {
        name: { type: String, required: true, unique: true },
        descript: String,
        markdown: String,
        props: [
            {
                name: { type: String },
                descript: { type: String },
                "type": { type: String },
                "default": { type: String },
                show: { type: Boolean, default: true }
            }
        ],
        events:[
            {
                name: { type: String },
                descript: { type: String },
                "params": { type: String },
                show: { type: Boolean, default: true }
            }
        ],
        methods:[
            {
                name: { type: String },
                descript: { type: String },
                "params": { type: String },
                show: { type: Boolean, default: true }
            }
        ],
        createDate: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Api = mongoose.model('api', schema, 'Api');

module.exports = Api;


