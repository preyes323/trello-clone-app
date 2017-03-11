module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Trello Clone' });
  });

  router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About the Trello Clone App'});
  });
};
