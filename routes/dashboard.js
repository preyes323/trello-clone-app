const path = require('path');
const session = require('client-sessions');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');

module.exports = function(router, requireLogin) {
  const boardsFilePath = path.resolve(path.dirname(__dirname), 'data/boards.json');
  const boardsApi = Object
        .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud')))
        .init(boardsFilePath);

  const listsFilePath = path.resolve(path.dirname(__dirname), 'data/lists.json');
  const listsApi = Object
        .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud')))
        .init(listsFilePath);

  const cardsFilePath = path.resolve(path.dirname(__dirname), 'data/cards.json');
  const cardsApi = Object
        .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud')))
        .init(cardsFilePath);

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

  router.route('/boards/lists/:boardId')
    .get(function(req, res, next) {
      const boardId = parseInt(req.params.boardId, 10);
      const data = listsApi.findMany('boardId', boardId);
      res.json(data);
    })
    .patch(function(req, res, next) {
      const data = req.body;
      data.id = parseInt(data.id, 10);
      data.listPos = parseInt(data.listPos, 10);
      listsApi.put(data);
      listsApi.record();
      res.status(200).end();
    });

  router.route('/boards/lists/cards/:listId')
    .get(function(req, res, next) {
      const listId = parseInt(req.params.listId, 10);
      const data = cardsApi.findMany('listId', listId);
      res.json(data);
    })
    .patch(function(req, res, next) {
      const data = req.body;
      data.id = parseInt(data.id, 10);
      data.cardPos = parseInt(data.cardPos, 10);
      data.listId = parseInt(data.listId, 10);
      cardsApi.put(data);
      cardsApi.record();
      res.status(200).end();
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
