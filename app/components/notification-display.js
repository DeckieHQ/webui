import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    transition_to: function() {
      return this.get('notification').save()
        .then(() => this.get('notification').get('action').get('resource'))
        .then(
          (resource) => this.get('targetObject').send('transition_to', resource)
        )
      ;
    }
  }
});
