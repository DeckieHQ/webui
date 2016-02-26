import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.token": {
      presence: true
    }
  },

  actions: {
    verify_phone_number: function(defer) {
      this.send('save', this, defer);
    }
  }
 });
