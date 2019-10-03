var db = require('../database/db');
const dirFather = process.cwd();

//Kiểm tra khi người dùng create 1 user mới thì có nhập đầy đủ thông tin chưa
function checkInputPostCreate(req,res,next){
    var errors = [];
    if(req.body.name === ""){
        errors.push("Enter Name");
    }
    if(req.body.phone === ""){
        errors.push("Enter Phone");
    }
    if(req.body.email === ""){
        errors.push("Enter email");
    }
    if(req.body.password === ""){
        errors.push("Enter password");
    }
    if(errors.length > 0){
        res.render(dirFather + "/views/users/creatuser.pug",{
            errors: errors,
            value: req.body
        });
        return;
    }
    next();
}

//Kiểm tra người dùng đã login vào tài khoản chưa
function checkInputLogin(req,res,next){
    var errors = [];
    if(req.body.email === ""){
        errors.push('Enter your email');
    }
    if(req.body.password === ""){
        errors.push('Enter your password');
    }
    if(errors.length > 0){
        res.render(dirFather +  '/views/login/userLogin.pug',{
            errors: errors,
            value: req.body
        });
        return;
    }
    next();
}

//Xử lý check Cookie của user, chưa có cookie -> ko cho vào trang chủ và các chức năng
function forceUserLogin(req,res,next){
    var checkCookie = db.get('users')
                        .find({id: req.signedCookies.userCookie})
                        .value()
    if(!req.signedCookies.userCookie){
        res.redirect('/auth/login');
        return;
    }
    else{
        if(!checkCookie){
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}
module.exports = {
    checkInputPostCreate: checkInputPostCreate,
    checkInputLogin: checkInputLogin,
    forceUserLogin: forceUserLogin
}