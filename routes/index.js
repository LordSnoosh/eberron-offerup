var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/listings');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/listings',
    failureRedirect : '/listings'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/listings');
});

module.exports = router;
