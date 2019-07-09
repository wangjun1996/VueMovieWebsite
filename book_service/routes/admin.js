var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommend = require('../models/recommend');
var movie = require('../models/movie');
var article = require('../models/article');
var comment = require('../models/comment');
var user = require('../models/user');
var crypto = require('crypto');
const init_token = 'TKL02o';

// 定义路由
// 添加电影
router.post('/movieAdd', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.movieName){
        res.json({status:1, message: "电影名称为空"});
        return;
    }
    if(!req.body.movieImg){
        res.json({status:1, message: "电影图片地址为空"});
        return;
    }
    if(!req.body.movieVideo){
        res.json({status:1, message: "电影预告片地址为空"});
        return;
    }
    if(!req.body.movieTime){
        res.json({status:1, message: "电影上映时间为空"});
        return;
    }
    if(!req.body.movieDownload){
        res.json({status:1, message: "电影播放地址为空"});
        return;
    }
    var movieMainPage = req.body.movieMainPage ?  req.body.movieMainPage : false;
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                movie.findByMovieName(req.body.movieName, function (err, movieSave) {
                    if(movieSave.length != 0)
                        res.json({status:1, message: "该电影名称已存在，请勿重复添加"});
                    else{
                        var saveMovie = new movie({
                            movieName: req.body.movieName,
                            movieImg: req.body.movieImg,
                            movieVideo: req.body.movieVideo,
                            movieDownload: req.body.movieDownload,
                            movieTime: req.body.movieTime,
                            movieNumSuppose: 0,
                            movieNumDownload: 0,
                            movieMainPage: movieMainPage
                        });
                        saveMovie.save(function (err) {
                            if(err)
                                res.json({status: 1, message: err});
                            else
                                res.json({status:0, message: "电影添加成功"});
                        })
                    }
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 更新电影
// 更新语句：Model.update(conditions, doc, [options], [callback])
router.post('/movieUpdate', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.movie_id)
        res.json({status:1, message: "电影id为空"});
    if(!req.body.movieName)
        res.json({status:1, message: "电影名称为空"});
    if(!req.body.movieImg)
        res.json({status:1, message: "电影图片地址为空"});
    if(!req.body.movieVideo)
        res.json({status:1, message: "电影预告片地址为空"});
    if(!req.body.movieDownload)
        res.json({status:1, message: "电影播放地址为空"});
    if(!req.body.movieTime)
        res.json({status:1, message: "电影上映时间为空"});
    if(req.body.movieNumSuppose === "")
        res.json({status:1, message: "电影点赞数为空"});
    if(req.body.movieNumDownload === "")
        res.json({status:1, message: "电影下载数为空"});
    var movieMainPage = req.body.movieMainPage ?  req.body.movieMainPage : false;
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                movie.findById(req.body.movie_id, function (err, movieId) {
                    if(movieId.length == 0)
                        res.json({status:1, message: "该电影ID不存在"});
                    else{
                        var updateContent = {
                            movieName: req.body.movieName,
                            movieImg: req.body.movieImg,
                            movieVideo: req.body.movieVideo,
                            movieDownload: req.body.movieDownload,
                            movieTime: req.body.movieTime,
                            movieNumSuppose: req.body.movieNumSuppose,
                            movieNumDownload: req.body.movieNumDownload,
                            movieMainPage: movieMainPage
                        };
                        console.log(updateContent)
                        movie.update({_id: req.body.movie_id}, updateContent, function (err, movieUpdate) {
                            console.log(movieUpdate)
                            if(movieUpdate.nModified == 0 || err)
                                res.json({status: 1, message: "电影信息没有改变"});
                            else
                                res.json({status:0, message: "电影信息修改成功", data: movieUpdate});
                        })
                    }
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 删除电影
router.post('/movieDel', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.movie_id)
        res.json({status:1, message: "电影id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                movie.remove({_id: req.body.movie_id}, function (err, delMovie) {
                    if(delMovie.deletedCount == 0)
                        res.json({status: 1, message: "电影id不存在"});
                    else
                        res.json({status:0, message: "电影删除成功", data: delMovie});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 获取所有电影
router.get('/movie', function(req, res, next) {
    movie.findAll(function (err, allMovie) {
        res.json({status:0, message:"获取所有电影成功", data: allMovie});
    })
});

// 获取所有用户评论
router.get('/commentList', function(req, res, next) {
    comment.findAll(function (err, allComment) {
        res.json({status:0, message:"获取所有用户评论成功", data: allComment});
    })
});

// 审核用户的评论
router.post('/checkComment', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.comment_id)
        res.json({status:1, message: "评论id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                comment.update({_id: req.body.comment_id}, {check: true}, function (err, updateComment) {
                    if(updateComment.nModified == 0)
                        res.json({status: 1, message: "评论已审核或评论id不存在"});
                    else
                        res.json({status:0, message: "评论审核成功", data: updateComment});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 删除用户的评论
router.post('/delComment', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.comment_id)
        res.json({status:1, message: "评论id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                comment.remove({_id: req.body.comment_id}, function (err, delComment) {
                    if(delComment.deletedCount == 0)
                        res.json({status: 1, message: "评论id不存在"});
                    else
                        res.json({status:0, message: "评论删除成功", data: delComment});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 封停用户
router.post('/stopUser', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.stopUser_id)
        res.json({status:1, message: "需要封停的id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.update({_id: req.body.stopUser_id}, {userStop: true}, function (err, stopUser) {
                    if(stopUser.nModified == 0)
                        res.json({status: 1, message: "用户已被封停或用户id不存在"});
                    else
                        res.json({status:0, message: "用户封停成功", data: stopUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 解封用户
router.post('/cancelStopUser', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.cancelStopUser_id)
        res.json({status:1, message: "需要解封的id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.update({_id: req.body.cancelStopUser_id}, {userStop: false}, function (err, stopUser) {
                    if(stopUser.nModified == 0)
                        res.json({status: 1, message: "用户已被解封或用户id不存在"});
                    else
                        res.json({status:0, message: "用户解封成功", data: stopUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 获取所有用户
router.post('/showUser', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.findAll(function (err, allUser) {
                    res.json({status:0, message: "获取所有用户成功", data: allUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 删除用户
router.post('/delUser', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.deleteUser_id)
        res.json({status:1, message: "需要删除的用户id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.remove({_id: req.body.deleteUser_id}, function (err, delUser) {
                    if(delUser.deletedCount == 0)
                        res.json({status: 1, message: "需要删除的用户id不存在"});
                    else
                        res.json({status:0, message: "用户删除成功", data: delUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 升级为管理员用户
router.post('/updateAdmin', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.updateUser_id)
        res.json({status:1, message: "需要管理权限的id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.update({_id: req.body.updateUser_id}, {userAdmin: true}, function (err, updateUser) {
                    if(updateUser.nModified == 0)
                        res.json({status: 1, message: "用户已经是管理员或用户id不存在"});
                    else
                        res.json({status:0, message: "用户权限修改成功", data: updateUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 管理用户权限
router.post('/updatePower', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.updateUser_id)
        res.json({status:1, message: "需要管理权限的id为空"});
    if(req.body.userAdmin === "")
        res.json({status:1, message: "是否为管理员选项为空"});
    if(req.body.userPower === "")
        res.json({status:1, message: "用户权限选项为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                user.update({_id: req.body.updateUser_id}, {userAdmin: req.body.userAdmin, userPower: req.body.userPower}, function (err, updateUser) {
                    if(updateUser.nModified == 0)
                        res.json({status: 1, message: "用户权限未修改或用户id不存在"});
                    else
                        res.json({status:0, message: "用户权限修改成功", data: updateUser});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 添加影评
router.post('/addArticle', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.articleTitle){
        res.json({status:1, message: "影评标题为空"});
        return;
    }
    if(!req.body.articleContext){
        res.json({status:1, message: "影评内容为空"});
        return;
    }

    var articleMainPage = req.body.articleMainPage ?  req.body.articleMainPage : false;

    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                var nowTime = new Date();
                var saveArticle = new article({
                    articleTitle: req.body.articleTitle,
                    articleContext: req.body.articleContext,
                    articleTime: nowTime.toLocaleString(),
                    articleMainPage: articleMainPage
                });
                saveArticle.save(function (err) {
                    if(err)
                        res.json({status: 1, message: err});
                    else
                        res.json({status:0, message: "影评添加成功"});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 删除影评
router.post('/delArticle', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.article_id)
        res.json({status:1, message: "影评id为空"});
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                article.remove({_id: req.body.article_id}, function (err, delArticle) {
                    if(delArticle.deletedCount == 0)
                        res.json({status: 1, message: "影评id不存在"});
                    else
                        res.json({status:0, message: "影评删除成功", data: delArticle});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 更新影评
// 更新语句：Model.update(conditions, doc, [options], [callback])
router.post('/articleUpdate', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.article_id)
        res.json({status:1, message: "影评id为空"});
    if(!req.body.articleTitle)
        res.json({status:1, message: "影评标题为空"});
    if(!req.body.articleContext)
        res.json({status:1, message: "影评内容为空"});
    if(!req.body.articleTime)
        res.json({status:1, message: "影评发布时间为空"});
    var articleMainPage = req.body.articleMainPage ?  req.body.articleMainPage : false;
    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower >= 1){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                article.findByArticleId(req.body.article_id, function (err, articleId) {
                    if(articleId.length == 0)
                        res.json({status:1, message: "该影评ID不存在"});
                    else{
                        var updateContent = {
                            articleTitle: req.body.articleTitle,
                            articleContext: req.body.articleContext,
                            articleTime: req.body.articleTime,
                            articleMainPage: articleMainPage
                        };
                        console.log(updateContent)
                        article.update({_id: req.body.article_id}, updateContent, function (err, articleUpdate) {
                            console.log(articleUpdate)
                            if(articleUpdate.nModified == 0 || err)
                                res.json({status: 1, message: "影评信息没有改变"});
                            else
                                res.json({status:0, message: "影评信息修改成功", data: articleUpdate});
                        })
                    }
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 获取所有影评
router.get('/article', function (req, res, next) {
    article.findAll(function (err, getAllArticles) {
        res.json({status: 0 , message: "获取所有的影评", data: getAllArticles});
    })
});

// 添加主页推荐图片
router.post('/addRecommend', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.recommendImg)
        res.json({status:1, message: "推荐图片的链接为空"});
    if(!req.body.recommendSrc)
        res.json({status:1, message: "推荐图片的跳转地址为空"});
    if(!req.body.recommendTitle)
        res.json({status:1, message: "推荐图片的标题为空"});

    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                var saveRecommend = new recommend({
                    recommendImg: req.body.recommendImg,
                    recommendSrc: req.body.recommendSrc,
                    recommendTitle: req.body.recommendTitle
                });
                saveRecommend.save(function (err) {
                    if(err)
                        res.json({status: 1, message: err});
                    else
                        res.json({status:0, message: "主页推荐添加成功"});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
        }
    });
});

// 删除主页推荐
router.post('/delRecommend', function(req, res, next) {
    if(!req.body.username)
        res.json({status:1, message: "用户名为空"});
    if(req.body.token != getMD5Password(req.body.user_id))
        res.json({status:1, message: "用户登录出错"});
    if(!req.body.user_id)
        res.json({status:1, message: "用户id为空"});
    if(!req.body.recommend_id)
        res.json({status:1, message: "主页推荐的id为空"});

    user.findByUsername(req.body.username, function (err, getUser) {
        var userPower = getUser[0].userPower;
        if(userPower == 2){
            if(getUser[0].userAdmin && !getUser[0].userStop){
                recommend.remove({_id: req.body.recommend_id}, function (err, delRecommend) {
                    if(delRecommend.deletedCount == 0)
                        res.json({status: 1, message: "主页推荐id不存在"});
                    else
                        res.json({status:0, message: "主页推荐删除成功", data: delRecommend});
                })
            }else{
                res.json({status:1, message:"用户不是管理员或账号已被停用"});
            }
        }else{
            res.json({status:1, message:"您没有权限执行此操作"});
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
