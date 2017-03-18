const Users = Backbone.Collection.extend({
  model: User,
  url: '/users',
});
