var express = require('express');
var controllerUser = require('../Controller/user.response');
var userValidate = require('../Middleware/user.middleware');
var router = express.Router();



router.get('/search',controllerUser.getSearchUser)
      .get('/create',controllerUser.getCreateUser)
      .post('/create',userValidate.checkInputPostCreate,controllerUser.postCreateUser)
      .get('/view/:id',controllerUser.getInformationUser)
      .get('/home',controllerUser.getBackHome)


module.exports = router;