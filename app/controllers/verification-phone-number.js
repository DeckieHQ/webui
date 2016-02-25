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
      return this.validate()
        .then(() => this.get('model').save())
        .then(defer.resolve)
        .catch((reason) => {
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
 });
