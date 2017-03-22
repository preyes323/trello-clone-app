const NotificationsView = Backbone.View.extend({
  template: Handlebars.templates.boardsNotification,
  el: 'main.app',

  render() {
    $('.pop-up').remove();
    this.$el.append(this.template({ notifications: this.collection.toJSON() }));
  },
});
