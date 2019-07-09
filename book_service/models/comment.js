var mongoose = require('..//common/db');

// 建立电影评论数据集
var comment = new mongoose.Schema({
    movie_id: String,
    username: String,
    context: String,
    check: Boolean
});

// 查找所有电影评论
comment.statics.findAll = function (callBack) {
    this.find({}, callBack);
};

// 根据电影ID查找已审核的评论
comment.statics.findByMovieId = function (m_id, callBack) {
    this.find({movie_id:m_id, check: true}, callBack);
};

var commentModel = mongoose.model('comment', comment);

module.exports = commentModel;
