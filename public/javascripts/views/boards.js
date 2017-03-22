const BoardsView = Backbone.View.extend({
  el: 'main.app',
  allBoardsTemplate: Handlebars.templates.boards,
  createBoard: Handlebars.templates.createBoard,
  newBoard: Handlebars.templates.newBoard,
  events: {
    'click .new-board': 'createNewBoard',
    'submit': 'addBoard',
    'click li.board span.icon-close': 'deleteBoard',
  },

  deleteBoard(e) {
    const boardId = $(e.target).closest('li.board').data('id');
    $.ajax({
      url: `/boards/${boardId}`,
      method: 'DELETE',
      dataType: 'json',
      success(json) {
        const boardData = App.boards.remove(json.boardId);
        $(`.boards [data-id=${json.boardId}]`).remove();
        App.trigger('boardDeleted', boardData);
      },
    });
  },

  createNewBoard() {
    App.trigger('createNewBoard');
  },

  search(e) {
    $(e.target).closest('div').find('li').show();
    $(e.target).closest('div').find('li').each(function() {
      if ($(this).text().toLowerCase().match($(e.target).val().toLowerCase())) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  },

  addBoard(e) {
    e.preventDefault();
    const $form = $('form');

    const boardData = {
      title: $form.find(':text').val(),
      userId: App.user.get('id'),
      type: 'Personal',
    };

    $.ajax({
      url: $form.attr('action'),
      method: $form.attr('method'),
      data: boardData,
      dataType: 'json',
      success(json) {
        App.boards.add(json);
      },
    });

    $form.closest('div').remove();
  },

  renderPersonal() {
    const personalBoards = _.where(this.collection.toJSON(), { type: 'Personal' });

    this.$el.html(this.allBoardsTemplate({
      name: 'Personal',
      boards: personalBoards,
    }));

    this.$('#boards-personal').append(this.createBoard());
  },

  initialize() {
    this.$el.on('keydown', '.board-search-box', _.debounce(this.search, 500));
  },
});
