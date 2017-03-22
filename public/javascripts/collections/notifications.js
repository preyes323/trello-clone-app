const Notifications = Backbone.Collection.extend({
  model: Notification,
  comparator(notification) {
    return -parseInt(notification.get('notificationData').dateVal, 10);
  },
});
