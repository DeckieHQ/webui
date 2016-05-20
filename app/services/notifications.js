import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  notifications_count: 0,

  init() {
    this._super(...arguments);
    this.retrieve_notifications_count();
  },

  retrieve_notifications_count: function() {
    let self = this;

    self.get('store').find('user', '').then((user) => {
      self.set('notifications_count', user.get('notifications_count'));
      Ember.run.later( function() {
        self.retrieve_notifications_count();
      }, 60*1000);
    });
  }
});
