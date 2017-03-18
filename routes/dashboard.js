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

  // REST API
  router.route('/boards/user/:userId')
    .all(requireLogin, function(req, res, next) {
      next();
    })
    .get(function(req, res, next) {
      const userBoards = boardsApi.findMany('userId', parseInt(req.params.userId, 10));
      res.json(userBoards);
    });
};
