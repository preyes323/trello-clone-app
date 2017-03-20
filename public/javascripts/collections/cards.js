const Cards = Backbone.Collection.extend({
  model: Card,
  comparator: 'cardPos',
});
