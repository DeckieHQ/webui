import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
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
    authenticate: function(defer) {
      let identification = this.get('email');
      let password = this.get('password');

      return this.validate()
        .then(() => this.get('session').authenticate('authenticator:devise', identification, password))
        .then(() => {
          defer.resolve();
          if (this.get('transition')) {
            this.get('targetObject').send('transition');
          } else {
            this.get('targetObject').transitionToRoute('search');
          }
        })
        .catch((reason) => {
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
});
