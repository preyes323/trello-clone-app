const Router = Backbone.Router.extend({
  routes: {
    'dashboard': 'dashHome',
    'boards/:boardId': 'loadBoard',
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
