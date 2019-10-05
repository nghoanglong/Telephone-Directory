var express = require('express');
var cookies = require('cookie-parser');
var userRouter = require('./routes/user.route');
var loginRouter  = require('./routes/auth.login'); 
var checkCookieMiddleWare = require('./Middleware/user.middleware');
var mongoose = require('mongoose');
var usersList = require('./Models/users.db');


var app = express();
var port = 3000;

//set sth relate to code
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookies('sdasdasdfwefeisajdisajdijiquwjd1239238742jijsdalsd'));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/save-phone-number',{useNewUrlParser: true, useUnifiedTopology: true});

//router
app.use('/users',checkCookieMiddleWare.forceUserLogin,userRouter);
app.use('/auth',loginRouter);


//Trang chủ
app.get('/',checkCookieMiddleWare.forceUserLogin,async function(req, res){
    var user = await usersList.find();
    res.render(__dirname + "/views/Introduction.pug",{
        users: user
    });
})


app.listen(port, function(){
    console.log("Example app listening on port " + port);
})