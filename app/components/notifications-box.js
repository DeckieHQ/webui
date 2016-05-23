import Ember from 'ember';

export default Ember.Component.extend({
  notifications: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    retrieve_notifications: function() {
      return this.get('store').query('notification', { include: 'action' })
        .then((list) => {
          this.set('list', list);
          Ember.$('#notifications').show();
        })
      ;
    },

    transition_to: function(notification) {
      return notification.get('action').get('resource').then(
        (r) => this.get('targetObject').send('transition_to', r)
      );
    }
  }
});
