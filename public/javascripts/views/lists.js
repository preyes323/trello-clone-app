const ListsView = Backbone.View.extend({
  el: 'main.app',
  template: Handlebars.templates.lists,

  renderWithCards() {
    const lists = this.collection.toJSON();
    lists.forEach((list) => {
      list.cards = this.collection.get(list.id).cards.toJSON();
    });

    this.render({ lists });
  },

  renderList() {
    const lists = this.collection.toJSON();
    this.render({ lists });
  },

  render(context) {
    $('.lists-container').remove();
    this.$el.append(this.template(context));
  },

  initialize() {
    this.listenTo(this.collection, 'cardsUpdated', this.renderWithCards);
  },
});
