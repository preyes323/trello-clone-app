const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const routeFiles = ['index', 'user'];

routeFiles.forEach((router) => {
  require(path.resolve(path.dirname(__dirname), `routes/${router}`))(router);
});

module.exports = router;
