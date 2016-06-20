import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    transition_to: function() {
      return this.get('notification').save()
      .then((notification) => {
        this.get('targetObject').send('transition_to', notification)
      });
    }
  }
});
