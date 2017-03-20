const Router = Backbone.Router.extend({
  routes: {
    'boards': 'showBoardsSearch',
    'dashboard': 'dashHome',
    'boards/:boardId': 'loadBoard',
  },

  showBoardsSearch() {
    App.trigger('showBoardSearch');
  },

  dashHome() {
    App.trigger('showDashboard');
  },

  loadBoard(boardId) {
    App.trigger('showBoardList', boardId);
  },

  initialize() {
    this.route(/^\/?$/, 'dashHome');
  },
});
