import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
  cultures: [ "en" ],

  validations: {
    "model.current_password": {
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
    update: function(defer) {
      let model = this.get('model');

      return model.validate()
        .then(() => this.validate())
        .then(() => {
          let birthday = moment()
            .date(this.get('day'))
            .month(this.get('month'))
            .year(this.get('year'))
            .toDate();

          model.set('birthday', birthday);

          return model.save();
        })
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
