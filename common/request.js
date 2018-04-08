const request = require('request');


const remoteGet = url => new Promise((resolve, reject) => request.get(url, (err, response, body) => {
    if (err) {
        reject(err);
    } else {
        resolve(body);
    }
}));

module.exports = remoteGet;