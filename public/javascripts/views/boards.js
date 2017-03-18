const BoardsView = Backbone.View.extend({
  el: 'main.app',
  allBoardsTemplate: Handlebars.templates.boards,
  createBoard: Handlebars.templates.createBoard,
  newBoard: Handlebars.templates.newBoard,

  renderPersonal() {
    if (!this.$('#boards-personal')) {
      this.$el.html(this.allBoardsTemplate({
      }));
    }
  },
});
