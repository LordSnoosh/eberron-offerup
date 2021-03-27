const express = require('express');
const router = express.Router();
const mercenariesCtrl = require('../controllers/mercenaries');
const isLoggedIn = require('../config/auth');

router.get('/mercenaries/new', isLoggedIn, mercenariesCtrl.new);
router.post('/mercenaries', isLoggedIn, mercenariesCtrl.create);
router.post('/listings/:id/mercenaries', isLoggedIn, mercenariesCtrl.addToParty);

module.exports = router;