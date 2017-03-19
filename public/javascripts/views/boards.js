const BoardsView = Backbone.View.extend({
  el: 'main.app',
  allBoardsTemplate: Handlebars.templates.boards,
  createBoard: Handlebars.templates.createBoard,
  newBoard: Handlebars.templates.newBoard,
  events: {
    'click .new-board': 'createNewBoard',
  },

  createNewBoard() {
    App.trigger('createNewBoard');
  },

  renderPersonal() {
    const personalBoards = _.where(this.collection.toJSON(), { type: 'Personal' });

    this.$el.html(this.allBoardsTemplate({
      name: 'Personal',
      boards: personalBoards,
    }));

    this.$('#boards-personal').append(this.createBoard());
  },
});
