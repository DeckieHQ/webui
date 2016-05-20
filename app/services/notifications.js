import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  notifications: null,

  init() {
    this._super(...arguments);
    this.retrieve_notifications();
  },

  retrieve_notifications: function() {
    let self = this;

    self.get('store').findAll('notification').then((notifications) => {
      self.set('notifications', notifications);
      Ember.run.later( function() {
        self.retrieve_notifications();
      }, 15*1000);
    });
  }
});
