var mongoose = require('..//common/db');

// 建立首页推荐的数据集
var recommend = new mongoose.Schema({
    recommendImg: String,
    recommendSrc: String,
    recommendTitle: String
});

// 查找所有首页推荐的电影
recommend.statics.findAll = function (callBack) {
    this.find({}, callBack);
};

// 根据电影ID查找首页推荐
recommend.statics.findByIndexId = function (m_id, callBack) {
    this.find({findByIndexId:m_id}, callBack);
};

var recommendModel = mongoose.model('recommend', recommend);

module.exports = recommendModel;
