var express = require('express');
var controllerLogin = require('../Controller/auth.login');
var userValidate = require('../Middleware/user.middleware');
var router = express.Router();

router.get('/login',controllerLogin.getUserLogin)
      .post('/login',userValidate.checkInputLogin,controllerLogin.postUserLogin)

module.exports = router;