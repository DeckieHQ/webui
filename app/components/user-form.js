import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  init: function() {
    this._super.apply(this, arguments);

    let birthday = this.get('model').get('birthday');

    if (birthday) {
      this.set('day', moment(birthday).format("DD"));
      this.set('month', moment(birthday).format("MMMM"));
      this.set('year', moment(birthday).format("YYYY"));
    }
  },

  validations: {
    password: {
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

  months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
  cultures: [ "en" ],

  monthPlaceHolder: function() {
    if (this.get('alreadyCreated')) {
      return null;
    } else {
      return 'Pick month...';
    }
  }.property(),

  actions: {
    toto: function(defer) {
      let model = this.get('model');
      let password = this.get('password');

      return model.validate()
        .then(() => this.validate())
        .then(() => {
          let birthday = moment()
            .date(this.get('day'))
            .month(this.get('month'))
            .year(this.get('year'))
            .toDate();

          model.set('birthday', birthday);

          if (this.get('alreadyCreated')) {
            model.set('current_password', password);
          } else {
            model.set('password', password);
          }

          return model.save();
        })
        .then(() => this.get('session').authenticate('authenticator:devise', model.get('email'), password))
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  },
});
