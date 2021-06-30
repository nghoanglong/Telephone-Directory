var md5 = require('md5');
var usersList = require('../Models/users.db')

//Xử lý request liên quan tới trang login và validate user
function getUserLogin(req,res){
    res.render(process.cwd() +  '/views/login/userLogin.pug');
}
async function postUserLogin(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var user = await usersList.findOne({email: email},function(err,data){
        return data;
    });
                            
    if(!user){
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
    res.cookie('userCookie',user._id,{
        signed: true
    });
    res.redirect('/');
}
module.exports = {
    getUserLogin: getUserLogin,
    postUserLogin: postUserLogin
}