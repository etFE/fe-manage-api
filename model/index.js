const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ef_manage');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connect success");
});

// model
module.exports.System = require('./system');
module.exports.Menu = require('./menu');
module.exports.User = require('./user');
module.exports.Role = require('./role');
module.exports.Person = require('./person');
module.exports.Log = require('./log');
module.exports.File = require('./file');