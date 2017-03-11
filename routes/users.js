module.exports = function(router) {
  router.get('/users/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
  });

  router.get('/users/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });
};
