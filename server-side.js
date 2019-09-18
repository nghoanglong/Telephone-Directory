var express = require('express');
var db = require('./database/db');
var userRouter = require('./routes/user.route');
var app = express();
var port = 3000;

//set sth relate to code
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRouter);
app.use(express.static('public'));

//Trang chủ
app.get('/', function(req, res){
    res.render(__dirname + "/views/Introduction.pug",{
        users: db.get('users').value()
    });
})

app.listen(port, function(){
    console.log("Example app listening on port " + port);
})