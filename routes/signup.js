// signup.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('clientSignup');
});

router.post('/', async (req, res) => {
  const email = req.body['email'];
  const password = req.body['password'];
  try {
    const user = new User({ email, password });
    await user.save();
    req.session.user = user;
    res.redirect('/index.html');
  } catch (error) {
    console.log('Error while registering: ' + error);
    res.redirect('/index.html');
  }
});

module.exports = router;
