const express = require('express');
const router = express.Router();

const apiController = require('../controller/apiController')

router.get('/old-data', apiController.getOldData)
router.post('/update-score', apiController.updateScore)

router.post('/signIn', apiController.addPlayer)

router.post('/send-answer', apiController.sendAnswer)
router.post('/question', apiController.questionState)
router.post('/time-up', apiController.timeUp)
router.post('/reset', apiController.resetGame)
router.post('/re-signIn', apiController.reSignIn)

module.exports = router;
