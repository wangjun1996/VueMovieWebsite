var mongoose = require('..//common/db');

// 建立站内信数据集
var mail = new mongoose.Schema({
    fromUser: String,
    toUser: String,
    title: String,
    context: String,
    date: String
});

// 根据收信人ID查找站内信
mail.statics.findByToUserId = function (to_id, callBack) {
    this.find({toUser:to_id}, callBack);
};

// 根据发信人ID查找站内信
mail.statics.findByFromUserId = function (from_id, callBack) {
    this.find({fromUser:from_id}, callBack);
};

var mailModel = mongoose.model('mail', mail);

module.exports = mailModel;
