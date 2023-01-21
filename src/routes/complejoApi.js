const express = require('express');
const router = express.Router();

const complejoControllerApi = require('../controllers/complejoControllerApi');



router.get('/', complejoControllerApi.totalComplejo);
router.get('/:id', complejoControllerApi.unaComplejo);







module.exports = router;