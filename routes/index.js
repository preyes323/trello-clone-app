module.exports = function(router) {
  router.get('/', function(req, res, next) {
    if (req.user) {
      res.redirect('/dashboard');
    } else {
      res.render('index', { title: 'Trello Clone' });
    }
  });

  router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About the Trello Clone App'});
  });
};
