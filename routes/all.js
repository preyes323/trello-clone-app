const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const routeFiles = ['index', 'users', 'dashboard'];

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/users/login');
  }

  next();
}

routeFiles.forEach((route) => {
  require(path.resolve(path.dirname(__dirname), `routes/${route}`))(router, requireLogin);
});

module.exports = router;
