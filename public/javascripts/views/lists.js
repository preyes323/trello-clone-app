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
    new Sortable(document.querySelector('#lists'), {
      animation: 50,
      onSort(e) {
        $(e.to).find('li.list').each((idx, el) => {
          $.ajax({
            url: `/boards/lists/${idx}`,
            method: 'PATCH',
            data: {
              id: $(el).data('id'),
              listPos: (idx + 1),
            },
          });
        });
      },
    });

    this.$('.cards').each((_, card) => {
      new Sortable(card, {
        group: 'cards',
        animation: 50,
        onSort(e) {
          $(e.to).find('li.card').each((idx, el) => {
            $.ajax({
              url: `/boards/lists/cards/${idx}`,
              method: 'PATCH',
              data: {
                id: $(el).data('id'),
                listId: $(e.to).data('id'),
                cardPos: (idx + 1),
              },
            });
          });
        },
      });
    });
  },

  initialize() {
    this.listenTo(this.collection, 'cardsUpdated', _.debounce(this.renderWithCards, 200));
  },
});
