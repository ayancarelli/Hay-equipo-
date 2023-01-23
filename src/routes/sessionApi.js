const express = require('express');
const router = express.Router();

const userSessionControllerApi = require('../controllers/userSessionControllerApi');



router.get('/', userSessionControllerApi.logged);







module.exports = router;