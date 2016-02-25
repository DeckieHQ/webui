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
