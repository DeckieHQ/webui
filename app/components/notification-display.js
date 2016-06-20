import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    transition_to: function() {
      return this.get('notification').save()
        .then((notification) => notification.get('action'))
        .then((action) => action.get('resource'))
        .then(
          (resource) => this.get('targetObject').send('transition_to', resource)
        )
      ;
    }
  }
});
