import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  validations: {
    "model.current_password": {
      presence: true
    }
  },

  actions: {
    update_profile: function(defer) {
      let model = this.get('model');

      return model.validate()
        .then(() => this.validate())
        .then(() => model.save())
        .then(() => this.get('session').authenticate('authenticator:devise', model.get('email'), model.get('current_password')))
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
 });
