const Boards = Backbone.Collection.extend({
  url: '/boards',
  model: Board,
});
