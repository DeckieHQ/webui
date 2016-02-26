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
    "model.email": {
      presence: true
    },
    "model.first_name": {
      presence: true
    },
    "model.last_name": {
      presence: true
    },
    "model.culture": {
      presence: true
    },
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

  passwordPlaceHolder: function() {
    if (this.get('alreadyCreated')) {
      return 'Enter current password';
    } else {
      return 'Enter password';
    }
  }.property(),

  actions: {
    save_user: function(defer) {
      let model = this.get('model');
      let password = this.get('password');

      this.get('targetObject').send('save', this, defer,
        () => {
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
        },
        () => this.get('session').authenticate('authenticator:devise', model.get('email'), password)
      );
    }
  },
});
