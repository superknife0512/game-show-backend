const express = require('express');
const router = express.Router();

const apiController = require('../controller/apiController')

router.get('/test', apiController.testController)
router.get('/old-data', apiController.getOldData)

router.post('/signIn', apiController.addPlayer)

router.post('/send-answer', apiController.sendAnswer)
router.post('/question', apiController.questionState)

module.exports = router;
