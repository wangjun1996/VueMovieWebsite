var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
var movie = require('../models/movie');
var mail = require('../models/mail');
var comment = require('../models/comment');
var article = require('../models/article');
const init_token = 'TKL02o';

/* GET users listing. */
// status: 1为出错，0为正常。message: 提示信息。data: 返回的数据
// 用户登录接口
router.post('/login', function (req, res, next) {
  if(!req.body.username)
    res.json({status:1, message: "用户名为空"});
  if(!req.body.password)
    res.json({status:1, message: "密码为空"});
  user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {
    console.log(userSave);
    if(userSave.length != 0){
      if(userSave[0].userStop == true)
        res.json({status:1, message: "该账户已被封停"});
      else{
        var token_after = getMD5Password(userSave[0]._id);
        res.json({status:0, data: {token: token_after, user: userSave}, message: "用户登录成功"});
      }
    }
    else
      res.json({status:1, message: "用户名或密码错误"});
  });
});

// 用户注册接口
router.post('/register', function (req, res, next) {
  if(!req.body.username)
    res.json({status:1, message: "用户名为空"});
  if(!req.body.password)
    res.json({status:1, message: "密码为空"});
  if(!req.body.userMail)
    res.json({status:1, message: "邮箱为空"});
  if(!req.body.userPhone)
    res.json({status:1, message: "手机号码为空"});

  user.findByUsername(req.body.username, function (err, userSave) {
    if(userSave.length != 0)
      res.json({status:1, message: "用户名已存在"});
    else{
      var registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0
      });
      registerUser.save(function () {
        res.json({status:0, message: "注册成功"});
      });
    }
  })
});

// 用户评论接口
router.post('/postComment', function (req, res, next) {
  if(!req.body.username)
    var username = "匿名用户";
  if(!req.body.movie_id)
    res.json({status:1, message: "电影id为空"});
  else if(!req.body.context){
    res.json({status:1, message: "评论内容为空"});
  }
  else{
    var saveComment = new comment({
      movie_id: req.body.movie_id,
      username: req.body.username ? req.body.username : username,
      context: req.body.context,
      check: 0
    });
    saveComment.save(function (err) {
      if(err)
        res.json({status:1, message: err});
      else
        res.json({status:0, message: "评论成功，请等待系统管理员审核"});
    });
  }
});

// 根据用户id查询用户身份
router.post('/showIdentity', function(req, res, next) {
  if(!req.body.user_id)
    res.json({status:1, message: "用户id为空"});
  user.findByUserId(req.body.user_id, function (err, identityData) {
    res.json({status:0, message:"获取用户身份信息成功", data: identityData});
  })
});

// 根据电影id获取已审核的评论
router.post('/showComment', function(req, res, next) {
  if(!req.body.movie_id)
    res.json({status:1, message: "电影id为空"});
  comment.findByMovieId(req.body.movie_id, function (err, comment) {
    res.json({status:0, message:"获取已审核的评论成功", data: comment});
  })
});

// 用户点赞接口
router.post('/support', function (req, res, next) {
  if(!req.body.movie_id)
    res.json({status:1, message: "电影id为空"});
  movie.findById(req.body.movie_id, function (err, supportMovie) {
    movie.update({_id: req.body.movie_id}, {movieNumSuppose: supportMovie[0].movieNumSuppose+1}, function (err) {
      if(err)
        res.json({status:1, message: "点赞失败", data: err});
      else
        res.json({status:0, message: "点赞成功"});
    });
  });
});

// 用户找回密码接口
router.post('/findPassword', function (req, res, next) {
  if(!req.body.username)
    res.json({status:1, message: "用户名为空"});
  if(!req.body.userMail)
    res.json({status:1, message: "邮箱为空"});
  if(!req.body.userPhone)
    res.json({status:1, message: "手机号码为空"});
  // 如果newPassword不存在，则检查该用户是否存在；若newPassword存在，则修改用户的密码
  if(!req.body.newPassword){
    user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function (err, findUser) {
      if(findUser.length != 0){
        if(findUser[0].userStop === false)
          res.json({status: 0, message : "验证成功"});
        else
          res.json({status: 1, message : "该账户已被封停，无法设置新密码"});
      } else {
        res.json({status: 1, message : "验证失败，请检查所有信息是否正确"});
      }
    })
  } else {
    user.findByUsername(req.body.username, function (err) {
      user.update({username: req.body.username}, {password: req.body.newPassword}, function (err) {
        if(err)
          res.json({status:1, message: "设置新密码失败", data: err});
        else
          res.json({status:0, message: "设置新密码成功"});
      })
    })
  }

});

// 用户发送站内信接口
router.post('/sendEmail', function (req, res, next) {
  if(!req.body.token)
    res.json({status:1, message: "用户登录状态出错"});
  if(!req.body.user_id)
    res.json({status:1, message: "用户未登录"});
  if(!req.body.toUserName)
    res.json({status:1, message: "收信人不能为空"});
  if(!req.body.title)
    res.json({status:1, message: "标题不能为空"});
  if(!req.body.context)
    res.json({status:1, message: "内容不能为空"});
  if(req.body.token == getMD5Password(req.body.user_id)){
    user.findByUsername(req.body.toUserName, function (err, toUser) {
      if(toUser.length != 0){
          var nowTime = new Date();
          var newEmail = new mail({
            fromUser: req.body.user_id,
            toUser: toUser[0]._id,
            title: req.body.title,
            context: req.body.context,
            date: nowTime.toLocaleString()
          });
          newEmail.save(function () {
            res.json({status: 0, message : "发送成功"});
          });
      }else{
        res.json({status: 1, message : "收信人不存在"});
      }
    })
  }else{
    res.json({status: 1, message : "用户登录错误"});
  }
});


// 接收站内信接口,receive=1:发送的内容，receive=2:接收的内容
router.post('/showEmail', function (req, res, next) {
  if(!req.body.token)
    res.json({status:1, message: "用户登录状态出错"});
  if(!req.body.user_id)
    res.json({status:1, message: "用户未登录"});
  if(!req.body.receive)
    res.json({status:1, message: "参数出错"});
  if(req.body.token == getMD5Password(req.body.user_id)){
    if(req.body.receive == 1){
      mail.findByFromUserId(req.body.user_id, function (err, sendMail) {
        res.json({status: 0, message : "获取发送的站内信成功", data: sendMail});
      })
    }else{
      mail.findByToUserId(req.body.user_id, function (err, receiveMail) {
        res.json({status: 0, message : "获取收到的站内信成功", data: receiveMail});
      })
    }
  }else{
    res.json({status: 1, message : "用户登录错误"});
  }
});

// 下载电影接口
router.post('/download', function (req, res, next) {
  if(!req.body.movie_id)
    res.json({status:1, message: "电影id为空"});
    movie.findById(req.body.movie_id, function (err, supportMovie) {
      if(err)
        res.json({status:1, message: "下载失败：不存在此电影id", data: err});
      else
      {
        movie.update({_id: req.body.movie_id}, {movieNumDownload: supportMovie[0].movieNumDownload+1}, function (err) {
        if(err)
          res.json({status:1, message: "下载失败", data: err});
        else
          res.json({status:0, message: "下载成功", data: supportMovie[0].movieDownload});
        });
      }
    });
});

// 根据id查看电影接口
router.post('/movieDetail', function (req, res, next) {
  if(!req.body.movie_id)
    res.json({status:1, message: "电影id为空"});
  movie.findById(req.body.movie_id, function (err, findMovie) {
    if(err)
      res.json({status:1, message: "不存在此电影id", data: err});
    else
    {
      if(err)
        res.json({status:1, message: "根据id查看电影失败", data: err});
      else
        res.json({status:0, message: "根据id查看电影成功", data: findMovie[0]});
    }
  });
});

// 根据id查看文章接口
router.post('/articleDetail', function (req, res, next) {
  if(!req.body.article_id)
    res.json({status:1, message: "文章id为空"});
  article.findByArticleId(req.body.article_id, function (err, findArticle) {
    if(err)
      res.json({status:1, message: "不存在此文章id", data: err});
    else
    {
      if(err)
        res.json({status:1, message: "根据id查看文章失败", data: err});
      else
        res.json({status:0, message: "根据id查看文章成功", data: findArticle[0]});
    }
  });
});

// 获取MD5值
function getMD5Password(id){
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token;
  return md5.update(token_before).digest('hex');
}

module.exports = router;
