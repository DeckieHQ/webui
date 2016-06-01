import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    update_profile: function(defer) {
      this.send('save', this, defer, false, null, () => this.set('updateAvatar', false));
    },

    update_avatar: function() {
      this.set('updateAvatar', true);
    },

    cancel: function() {
      this.set('updateAvatar', false);
    },
  }
 });
