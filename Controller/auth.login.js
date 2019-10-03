var db = require('../database/db');
var md5 = require('md5');

//Xử lý request liên quan tới trang login và validate user
function getUserLogin(req,res){
    res.render(process.cwd() +  '/views/login/userLogin.pug');
}
function postUserLogin(req,res){
    var email = req.body.email;
    var password = md5(req.body.password);
    var user = db.get('users')
                 .find({email: email})
                 .value()
    if(typeof user !== 'object'){
        res.render(process.cwd() +  '/views/login/userLogin.pug',{
            value: req.body,
            errors: ['User does not exist']
        })
        return;
    }
    if(password !== user.password){
        res.render(process.cwd() +  '/views/login/userLogin.pug',{
            value: req.body,
            errors: ['Wrong password']
        })
        return;
    }
    res.cookie('userCookie',user.id,{
        signed: true
    });
    res.redirect('/');
}
module.exports = {
    getUserLogin: getUserLogin,
    postUserLogin: postUserLogin
}