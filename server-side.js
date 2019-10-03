var express = require('express');
var db = require('./database/db');
var cookies = require('cookie-parser');
var userRouter = require('./routes/user.route');
var loginRouter  = require('./routes/auth.login'); 
var checkCookieMiddleWare = require('./Middleware/user.middleware');

var app = express();
var port = 3000;

app.use(cookies('sdasdasdfwefeisajdisajdijiquwjd1239238742jijsdalsd'));
app.use(express.static('public'));

//set sth relate to code
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//router
app.use('/users',checkCookieMiddleWare.forceUserLogin,userRouter);
app.use('/auth',loginRouter);


//Trang chủ
app.get('/',checkCookieMiddleWare.forceUserLogin,function(req, res){
    res.render(__dirname + "/views/Introduction.pug",{
        users: db.get('users').value()
    });
})


app.listen(port, function(){
    console.log("Example app listening on port " + port);
})