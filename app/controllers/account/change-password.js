import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.current_password": {
      presence: true
    },
    "model.password": {
      presence: true
    },
    "model.confirm_password": {
      presence: true
    },
  },

  actions: {
    change_password: function(defer) {
      this.send('save', this, defer);
    }
  }
 });
