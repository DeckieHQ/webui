import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  actions: {
    update_avatar: function() {
      this.set('updateAvatar', true);
      this.get('profile').save();
    },

    save: function(defer) {
      return this.get('profile').save().then(() => {
        defer.resolve();
        this.set('updateAvatar', false);
      });
    },
  }
});
