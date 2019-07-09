var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommend = require('../models/recommend');
var movie = require('../models/movie');
var article = require('../models/article');
var user = require('../models/user');

// 定义路由
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 定义路由
router.get('/mongooseTest', function (req, res, next) {
  mongoose.connect('mongodb://localhost/pets', {useMongoClient: true});
  mongoose.Promise = global.Promise;

  var schema = new mongoose.Schema({name: String});
  var Cat = mongoose.model('Cat', schema);

  var tom = new Cat({ name: 'Tom'});
  tom.save(function (err) {
    if(err)
      console.log(err);
    else
      console.log('success insert');
  });
  res.send('数据库连接测试。。。');
});

// 显示主页的推荐大图
router.get('/showIndex', function (req, res, next) {
  recommend.findAll(function (err, getRecommend) {
    res.json({status: 0 , message: "获取所有主页显示大图的电影", data: getRecommend});
  })
});

// 显示主页的推荐电影
router.get('/showRanking', function (req, res, next) {
  movie.find({movieMainPage: true}, function (err, getRecommend) {
    res.json({status: 0 , message: "获取所有主页推荐的电影", data: getRecommend});
  })
});

// 显示所有的电影
router.get('/showMovie', function (req, res, next) {
  movie.findAll(function (err, getMovies) {
    res.json({status: 0 , message: "获取所有的电影", data: getMovies});
  })
});

// 显示主页的推荐文章
router.get('/showArticle', function (req, res, next) {
  article.find({articleMainPage: true}, function (err, getArticles) {
    res.json({status: 0 , message: "获取所有主页推荐的文章", data: getArticles});
  })
});

// 显示所有的文章
router.get('/showAllArticle', function (req, res, next) {
  article.findAll(function (err, getAllArticles) {
    res.json({status: 0 , message: "获取所有的文章", data: getAllArticles});
  })
});

// 显示文章的内容
router.post('/articleDetail', function (req, res, next) {
  if(!req.body.article_id)
    res.json({status:1, message: "文章id出错"});
  article.findByArticleId(req.body.article_id, function (err, getArticle) {
    res.json({status: 0 , message: "获取文章成功", data: getArticle});
  })
});

// 显示用户个人信息的内容
router.post('/showUser', function (req, res, next) {
  if(!req.body.user_id)
    res.json({status:1, message: "用户未登录"});
  user.findByUserId(req.body.user_id, function (err, getUser) {
    res.json({status:0, message: "获取用户信息成功", data: {
        user_id: getUser[0]._id,
        username: getUser[0].username,
        userMail: getUser[0].userMail,
        userPhone: getUser[0].userPhone,
        userAdmin: getUser[0].userAdmin,
        userPower: getUser[0].userPower,
        userStop: getUser[0].userStop
      }})
  })
});

module.exports = router;
