import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  months: ["jan", "feb", "march"],

  validations: {
    "model.password": {
      presence: true
    },
    day: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 31
      }
    },
    month: {
      presence: true
    },
    year: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1900,
        lessThanOrEqualTo: 2000
      }
    }
  },

  actions: {
    register: function(defer) {
      let model = this.get('model');

      return model.validate()
        .then(() => this.validate())
        .then(() =>  {
          let year = this.get('year');
          let month = this.get('months').indexOf(this.get('month'));
          let day = parseInt(this.get('day')) + 1;
          let birthday = new Date(year, month, day);

          model.set('birthday', birthday);
          //TODO: check la date d'envoie si y'a pas un bug niveau backend

          return model.save();
        })
        .then(() => this.get('session').authenticate('authenticator:devise', model.get('email'), model.get('password')))
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error);
          this.set("showErrors", true);
          defer.reject();
        })
      ;
    }
  }
 });
