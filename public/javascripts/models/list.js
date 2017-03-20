const List = Backbone.Model.extend({
  getCards() {
    const listId = this.get('id');
    $.ajax({
      url: `/boards/lists/cards/${listId}`,
      method: 'GET',
      dataType: 'json',
      success: this.setCards.bind(this),
    });
  },

  setCards(json) {
    this.cards.reset(json);
    App.lists.trigger('cardsUpdated', this.get('id'));
  },

  initialize() {
    this.cards = new Cards,
    this.on('getCards', this.getCards, this);
  },
});
