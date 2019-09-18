var express = require('express');
var controllerFunc = require('../Controller/func.response');
var router = express.Router();



router.get('/search',controllerFunc.getSearchUser)
      .get('/create',controllerFunc.getCreateUser)
      .post('/create',controllerFunc.postCreateUser)
      .get('/:id',controllerFunc.getInformationUser)

module.exports = router;