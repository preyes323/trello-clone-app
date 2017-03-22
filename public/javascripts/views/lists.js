const ListsView = Backbone.View.extend({
  el: 'main.app',
  template: Handlebars.templates.lists,
  newListTemplate: Handlebars.templates.newList,
  newCardTemplate: Handlebars.templates.newCard,
  addCardTemplate: Handlebars.templates.addCard,
  events: {
    'click #new-list button': 'saveListItem',
    'click #new-list .icon-close': 'closeListItem',
    'click #lists p': 'addCard',
    'click #lists button': 'saveCard',
    'click #lists .icon-close': 'putBackAddCard',
  },

  saveListItem() {
    const title = this.$('#new-list input').val();
    const boardId = this.collection.boardId;
    $.ajax({
      url: `/boards/lists/${boardId}`,
      method: 'POST',
      data: {
        title,
        listPos: this.$('#lists li.list').length,
      },
      dataType: 'json',
      success: this.addList.bind(this),
    });
  },

  saveCard(e) {
    const $list = $(e.target).closest('li');
    const listId = $list.data('id');
    const title = this.$('#new-card textarea').val();
    const cardPos = $list.find('li.card').length;

    $.ajax({
      url: `/boards/lists/cards/${listId}`,
      method: 'POST',
      data: {
        title,
        cardPos,
      },
      dataType: 'json',
      success: this.addNewCard.bind(this),
    });
  },

  addNewCard(card) {
    const listId = card.listId;
    this.collection.get(listId).cards.add(card);
    card.boardId = this.collection.boardId;
    App.trigger('addNewCard', card);
    this.renderWithCards();
  },

  addList(list) {
    this.collection.add(list);
    this.renderWithCards();
  },

  addWidth() {
    const computedListWidth = (this.$('#lists li.list').length + 1) * 280
    const listWidth = parseInt(this.$('#lists').css('width'), 10);

    if (computedListWidth > listWidth) {
      this.$el.css('width', `${computedListWidth + 100}px`);
    }
  },

  closeListItem() {
    this.$('.add-list').removeClass('add-list');
  },

  enterNewList() {
    $(this).closest('div').addClass('add-list');
  },

  addCard(e) {
    const $li = $(e.target).closest('li');
    $(e.target).remove();
    this.putBackAddCard();
    $li.append(this.newCardTemplate());
  },

  putBackAddCard() {
    const $existNewCard = this.$('#new-card');
    if ($existNewCard) {
      $existNewCard.closest('li').append(this.addCardTemplate());
      $existNewCard.remove();
    }
  },

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
      filter: '.no-sort-list',
      onSort(e) {
        $(e.to).find('li.list').each((idx, el) => {
          $.ajax({
            url: `/boards/lists/${idx}`,
            method: 'PATCH',
            preventOnFilter: false,
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
        filter: '.no-sort-card',
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

            if ($(e.to).data('id') !== $(e.from).data('id')) {
              const toId = $(e.to).data('id');
              const fromId = $(e.from).data('id');
              const boardId = App.lists.boardId;

              const moveData = {
                source: App.lists.get(toId).get('title'),
                destination: App.lists.get(fromId).get('title'),
                boardTitle: App.boards.get(boardId).get('title'),
                title: e.item.innerText,
                boardId,
              };

              App.trigger('cardMoved', moveData);
            }
          });
        },
      });
    });
    this.$('.lists-container').append(this.newListTemplate());
    this.addWidth();
  },

  initialize() {
    this.listenTo(this.collection, 'cardsUpdated', _.debounce(this.renderWithCards, 200));
    this.$el.on('focus', '#new-list input', this.enterNewList);
  },
});
