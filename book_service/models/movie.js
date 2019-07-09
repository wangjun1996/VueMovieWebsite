var mongoose = require('..//common/db');

// 建立电影数据集
var movie = new mongoose.Schema({
    movieName: String,
    movieImg: String,
    movieVideo: String,
    movieDownload: String,
    movieTime: String,
    movieNumSuppose: Number,
    movieNumDownload: Number,
    movieMainPage: Boolean
});

// 查找所有电影
movie.statics.findAll = function (callBack) {
    this.find({}, callBack);
};

// 根据电影id查找
movie.statics.findById = function (m_id, callBack) {
    this.find({_id:m_id}, callBack);
};

// 根据电影名查找
movie.statics.findByMovieName = function (m_name, callBack) {
    this.find({movieName:m_name}, callBack);
};

var movieModel = mongoose.model('movie', movie);

module.exports = movieModel;
