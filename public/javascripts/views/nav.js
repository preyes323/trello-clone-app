const Nav = Backbone.View.extend({
  el: 'nav.app-layout',
  template: Handlebars.templates.nav,

  search(e) {
    $(e.target).addClass('focus');
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
