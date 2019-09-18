var db = require('../database/db');
const shortid = require('shortid');

//set root folder
const dirFather = process.cwd();


function getSearchUser(req,res){
    let query = req.query.q;
    var matchUsers = db.get('users')
                        .value()
                        .filter(function(key){
                            return key.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    })
    res.render(dirFather + "/views/Introduction.pug",{
        users: matchUsers,
    });
}
function getCreateUser(req,res){
    res.render(dirFather + "/views/users/creatuser.pug");
}
function postCreateUser(req,res){
    req.body.id = shortid.generate();
    db.get('users')
        .push(req.body)
        .write();
    res.redirect('/');
}
function getInformationUser(req,res){
    var userID = req.params.id;
    var feature = db.get('users')
                    .find({id: userID})
                    .value()
    res.render(dirFather + "/views/users/user.pug",{
        users: feature
    });
    
}
module.exports = {
    getSearchUser: getSearchUser,
    getCreateUser: getCreateUser,
    postCreateUser: postCreateUser,
    getInformationUser: getInformationUser
};