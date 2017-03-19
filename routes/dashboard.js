const path = require('path');
const session = require('client-sessions');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');

module.exports = function(router, requireLogin) {
  const boardsFilePath = path.resolve(path.dirname(__dirname), 'data/boards.json');
  const boardsApi = Object
        .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud')))
        .init(boardsFilePath);

  router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard' });
  });

  router.post('/boards', function(req, res, next) {
    res.redirect('/dashboard');
  });

  // REST API

  router.post('/boards/create', function(req, res, next) {
    const data = req.body;
    data.userId = parseInt(data.userId, 10);
    res.json(boardsApi.save(data));
  });

  router.route('/boards/user/:userId')
    .all(requireLogin, function(req, res, next) {
      next();
    })
    .get(function(req, res, next) {
      const userBoards = boardsApi.findMany('userId', parseInt(req.params.userId, 10));
      res.json(userBoards);
    })
    .post(function(req, res, next) {
      console.log(req.body);
    });
};
