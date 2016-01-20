import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  validations: {
    email: {
      presence: true
    },
    password: {
      presence: true
    }
  },

  actions: {
    authenticate: function() {
      let identification = this.get('email');
      let password = this.get('password');

      let self = this;

      return self.validate()
        .then(() => this.get('session').authenticate('authenticator:devise', identification, password))
            // .catch((reason) => {
            //   this.set('errorMessage', reason.error);
            // })
        // )
        .catch(() => {
          self.set("showErrors", true);
        });
    }
  }
});
