import Ember from 'ember';
import _ from 'lodash';
import EmberValidations from 'ember-validations';
import ENV from '../config/environment';

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
      this.set('emailSent',  false);
      this.set('emailError', false);

      let event = this.get('model'),
          store = this.store,
          emails = this.get('email').split(',').join(' ')
            .split(';').join(' ').split('-').join(' ')
            .split('_').join(' ').split('"').join(' ')
            .split('<').join(' ').split('>').join(' ')
            .split(/\s+/).filter(Boolean)

      let invitations = _.map(emails, email => {
        return store.createRecord('invitation', { email: email, event: event })
        .save().then(() => { return; }).catch(() => { return; });
      });
      return Promise.all(invitations).then(() => {
        this.set('email',     null);
        this.set('emailSent', true);

        defer.resolve();
      });
    },
  }
})
