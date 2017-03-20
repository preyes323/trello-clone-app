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
    debugger;
    this.cards.reset(json);
  },

  initialize() {
    this.cards = new Cards,
    this.on('getCards', this.getCards, this);
  },
});
