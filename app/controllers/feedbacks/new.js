import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.title": {
      presence: true
    },
    "model.description": {
      presence: true
    }
  },
  actions: {
    create: function(defer) {
      this.send('save', this, defer);
    }
  }
});
