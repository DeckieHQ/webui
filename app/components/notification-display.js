import Ember from 'ember';

export default Ember.Component.extend({
  no_actor: function() {
    let type = this.get('notification.type');
    return type == 'event-ready' || type == 'event-not_ready' || type == 'event-remove_full' || type == 'event-remove_start';
  }.property(),

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
