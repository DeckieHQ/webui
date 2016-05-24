import Ember from 'ember';

export default Ember.Component.extend({
  notifications: Ember.inject.service(),
  store: Ember.inject.service(),

  showNotifications: false,

  newNotifications: function() {
    return this.get('notifications').get('notifications_count') > 0;
  }.property('notifications.notifications_count'),

  actions: {
    retrieve_notifications: function() {
      if (this.get('showNotifications')) {
        this.toggleProperty('showNotifications');
      } else {
        return this.get('store').createRecord('reset-notifications-count').save()
          .then(() => {
            this.get('notifications').set('notifications_count', 0);

            return this.get('store').query('notification', { sort: '-action.created_at', include: 'action,action.actor' })
          })
          .then((list) => {
            this.set('list', list);
            this.toggleProperty('showNotifications');
            Ember.run.next(this, function(){
              let self = this;
              $(document).one('click',function(e) {
                if ( !$(e.target).is('#notifications-button, #notifications-button *')  ) {
                  self.toggleProperty('showNotifications');
                }
              });
            });
          })
        ;
      }
    },

    transition_to: function(resource) {
      return this.get('targetObject').send('transition_to', resource);
    }
  }
});
