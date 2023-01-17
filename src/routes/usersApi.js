const express = require('express');
const router = express.Router();

const usersControllerApi = require('../controllers/usersControllerApi');



router.get('/', usersControllerApi.list);
router.get('/:id', usersControllerApi.show);







module.exports = router;