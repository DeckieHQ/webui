import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

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
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 12
      }
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
          let month = parseInt(this.get('month')) - 1;
          let day = parseInt(this.get('day')) + 1;

          let birthday = new Date(year, month, day);
          model.set('birthday', birthday);

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
