const path = require('path');
const session = require('client-sessions');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const gravatar = require('gravatar');

module.exports = function(router, requireLogin) {
  const usersFilePath = path.resolve(path.dirname(__dirname), 'data/users.json');
  const usersApi = Object
        .create(require(path.resolve(path.dirname(__dirname), 'api/JSON-crud')))
        .init(usersFilePath);

  router.get('/users/logout', function(req, res, next) {
    req.session.reset();
    res.redirect('/');
  });

  router.get('/users/register', function(req, res, next) {
    res.render('register', {
      title: 'Register',
      csrfToken: req.csrfToken(),
    });
  });

  router.post('/users/register', function(req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };

    if (usersApi.isUnique('email', user.email)) {
      user.profilePic = gravatar.url(user.email, { s: 30 });
      user.handle = `@${user.firstName}${user.lastName}`;
      usersApi.set(user);
      usersApi.record();
      res.redirect('/users/login');
    } else {
      const error = 'That email is already taken, try another.';
      res.render('register', {
        title: 'Register',
        csrfToken: req.csrfToken(),
        error,
      });
    }
  });

  router.get('/users/login', function(req, res, next) {
    res.render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
    });
  });

  router.post('/users/login', function(req, res, next) {
    const user = usersApi.findOne('email', req.body.email);

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        error: 'Invalid username or password!',
      });
    }
  });

  // REST API
  router.get('/users', function(req, res, next) {
    const users = usersApi.getSanitized();
    return res.json(users);
  });

  router.route('/users/:userId')
    .all(requireLogin, function(req, res, next) {
      next();
    })
    .get(function(req, res, next) {
      const user = usersApi.findOne('id', parseInt(req.params.userId, 10));
      res.json(user);
    });
};
