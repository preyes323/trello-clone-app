const Lists = Backbone.Collection.extend({
  model: List,
  comparator: 'listPos',
});
