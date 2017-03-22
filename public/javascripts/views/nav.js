const Nav = Backbone.View.extend({
  el: 'nav.app-layout',
  template: Handlebars.templates.nav,
  events: {
    'click .header-user': 'showProfile',
    'click .icon-add': 'createBoard',
    'click .icon-notification': 'showNotifications',
    'click .header-boards': 'showBoardsSearch',
  },

  showProfile() {
    App.trigger('showProfilePopup');
  },

  createBoard() {
    App.trigger('createNewBoard');
  },

  showNotifications() {
    App.trigger('showNotifications');
  },

  search(e) {
    $(e.target).addClass('focus');
  },

  showBoardsSearch() {
    App.trigger('showBoardSearch');
  },

  removeFocus(e) {
    $(e.target).removeClass('focus');
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  initialize() {
    this.model.view = this;
    this.$el.on('focusin', 'input.search-box', this.search);
    this.$el.on('focusout', 'input.search-box', _.debounce(this.removeFocus, 100));
  },
});
