const Router = Backbone.Router.extend({
  routes: {
    'boards': 'showBoardsSearch',
    'dashboard': 'dashHome',
  },

  showBoardsSearch() {
    App.trigger('showBoardSearch');
  },

  dashHome() {
    App.trigger('showDashboard');
  },

  initialize() {
    this.route(/^\/?$/, 'dashHome');
  },
});
