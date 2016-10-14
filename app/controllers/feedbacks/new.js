import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.title": {
      presence: true,
      length: {
        maximum: 128
      }
    },
    "model.description": {
      presence: true,
      length: {
        maximum: 8192
      }
    }
  },
  actions: {
    create: function(defer) {
      let params = {
        afterSave: () => this.transitionToRoute('feedback-sent')
      };

      this.send('save', this, defer, params);
    }
  }
});
