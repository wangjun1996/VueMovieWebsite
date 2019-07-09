var mongoose = require('..//common/db');

// 建立用户数据集
var user = new mongoose.Schema({
   username: String,
   password: String,
   userMail: String,
   userPhone: String,
   userAdmin: Boolean,
   userPower: Number,   // userPower取值范围:0,1,2  0是普通用户没有后台权限，1是管理员1级权限，2是管理员2级权限能做的操作更多(如封停用户，管理用户权限，添加/删除主页推荐图片)
   userStop: Boolean
});

// 查找所有用户
user.statics.findAll = function (callBack) {
    this.find({}, callBack);
};

// 根据用户名查找
user.statics.findByUsername = function (name, callBack) {
    this.find({username:name}, callBack);
};

// 根据用户id查找
user.statics.findByUserId = function (id, callBack) {
    this.find({_id:id}, callBack);
};

// 登录匹配：用户名与密码正确并且没有被封停
user.statics.findUserLogin = function (name, password, callBack) {
  this.find({username:name, password:password}, callBack);
};

// 根据用户名、邮箱、电话找回密码
user.statics.findUserPassword = function (name, mail, phone, callBack) {
    this.find({username:name, userMail:mail, userPhone:phone}, callBack);
};

var userModel = mongoose.model('user', user);
module.exports = userModel;
