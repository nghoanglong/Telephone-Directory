var db = require('../database/db');
var md5 = require('md5');
const shortid = require('shortid');

//set root folder
const dirFather = process.cwd();

//Chức năng search user trong list
function getSearchUser(req,res){
    let query = req.query.q;
    var matchUsers = db.get('users')
                        .find({ name: query })
                        .value()
    res.render(dirFather + "/views/Introduction.pug",{
        users: matchUsers,
    });
}

//Xử lý get và post khi nhận reqest create user mới
function getCreateUser(req,res){
    res.render(dirFather + "/views/users/creatuser.pug");
}
function postCreateUser(req,res){
    req.body.id = shortid.generate();
    req.body.password = md5(req.body.password); //harsh password using md5
    db.get('users')
        .push(req.body)
        .write();
    res.redirect('/');
}

//Xử lý khi nhận request view information của user
function getInformationUser(req,res){
    var userID = req.params.id;
    var feature = db.get('users')
                    .find({id: userID})
                    .value()
    res.render(dirFather + "/views/users/user.pug",{
        users: feature
    });
    
}

//Xử lý button Home để quay về trang chủ
function getBackHome(req,res){
    res.redirect('/');
}
module.exports = {
    getSearchUser: getSearchUser,
    getCreateUser: getCreateUser,
    postCreateUser: postCreateUser,
    getInformationUser: getInformationUser,
    getBackHome: getBackHome
};