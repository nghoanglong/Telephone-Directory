var usersList = require('../Models/users.db')
var md5 = require('md5');


//set root folder
const dirFather = process.cwd();

//Chức năng search user trong list
async function getSearchUser(req,res){
    let query = req.query.q;
    var matchUsers = await usersList.find({name: query},function(err,data){
        return data;
    });

    res.render(dirFather + "/views/Introduction.pug",{
        users: matchUsers
    });
}

//Xử lý get và post khi nhận reqest create user mới
function getCreateUser(req,res){
    res.render(dirFather + "/views/users/creatuser.pug");
}
function postCreateUser(req,res){
    req.body.password = md5(req.body.password); //harsh password using md5
    var newUser = new usersList({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            return handleError(err);
        }
    })
    
    res.redirect('/');
}

//Xử lý khi nhận request view information của user
async function getInformationUser(req,res){
    var userID = req.params.id;
    var feature = await usersList.findOne({id: userID},function(err,data){
        return data;
    });
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