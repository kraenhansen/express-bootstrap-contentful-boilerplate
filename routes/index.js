const express = require('express');

const invitations = require('../services/invitations');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Yay!');
});

module.exports = router;
