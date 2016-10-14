import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.token": {
      presence: true
    }
  },

  alreadyVerified: function() {
    return this.get('currentUser.phone_number_verified');
  }.property(),

  actions: {
    verify_phone_number: function(defer) {
      let params = {
        afterSave: () => {
          this.set('verified', true);
          this.set('currentUser.phone_number_verified', true);
        }
      };

      this.send('save', this, defer, params);
    }
  }
 });
