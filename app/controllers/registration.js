import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  validations: {
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
        .then(() =>  {
          let birthday = new Date(this.get('year'), this.get('month'), this.get('day'));
          model.set('birthday', birthday);

          model.save().then(() => {
            this.get('session').authenticate('authenticator:devise', model.get('email'), model.get('password'))
              .then(() => defer.resolve());
          });
        })
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          this.set("showErrors", true);
          defer.reject();
        });
    }
  }
 });
