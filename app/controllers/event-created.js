import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  profileMissing: function() {
    if (!this.get('currentUser.profile.short_description') || !this.get('currentUser.profile.avatar_url')) {
      return true
    }
  }.property('currentUser.profile.short_description', 'currentUser.profile.avatar_url'),

  eventUrl: function() {
    return 'https://www.deckie.fr/event/' + this.get('model.id');
  }.property('model'),

  actions: {
    send_invitation: function(defer) {
      this.set('emailSent', false);
      this.set('emailError', false);
      let invitation = this.store.createRecord('invitation', {
        email: this.get('email'),
        event: this.get('model')
      });

      let params = {
        afterSave: () => {
          this.set('email', null);
          this.set('emailSent', true);
        },
        fail: () => {
          this.set('emailError', true);
        },
        model: invitation
      }

      this.send('save', this, defer, params);
    },
  }
})
