import Ember from 'ember';

export default Ember.Component.extend({
  notifications: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    retrieve_notifications: function() {
      return this.get('store').findAll('notification')
        .then((list) => {
          this.set('list', list);
          Ember.$('#notifications').show();
        })
      ;
    }
  }
});
