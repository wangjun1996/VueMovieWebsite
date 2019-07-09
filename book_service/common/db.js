var mongoose = require('mongoose');
var url = 'mongodb://localhost/movieServer';
mongoose.connect(url);

/* 链接成功 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + url);
});

// 链接异常
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error:' + err);
});

// 链接断开
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
