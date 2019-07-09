var mongoose = require('..//common/db');

// 建立文章的数据集
var article = new mongoose.Schema({
    articleTitle: String,
    articleContext: String,
    articleTime: String,
    articleMainPage: Boolean
});

// 查找所有的文章
article.statics.findAll = function (callBack) {
    this.find({}, callBack);
};

// 根据文章ID查找
article.statics.findByArticleId = function (id, callBack) {
    this.find({_id:id}, callBack);
};

var articleModel = mongoose.model('article', article);

module.exports = articleModel;
