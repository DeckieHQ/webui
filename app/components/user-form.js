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

  months: moment.months(),
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

  passwordErrors: function() {
    if (this.get('alreadyCreated')) {
      return this.get('model.errors.current_password');
    } else {
      return this.get('model.errors.password');
    }
  }.property('model.errors.current_password', 'model.errors.password'),

  actions: {
    save_user: function(defer) {
      let model = this.get('model');
      let password = this.get('password');

      let afterSave;

      if (this.get('transition')) {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password);
          this.get('targetObject').send('transition');
        }
      } else {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password);
          this.get('targetObject').transitionToRoute('search');
        }
      }

      let params = {
        beforeSave: () => {
          let date = [ this.get('day'), this.get('month'), this.get('year') ].join("-");
          let birthday = moment(date, "DD-MMMM-YYYY");

          if (!birthday.isValid()) {
            let birthday_error = birthday.toDate();
            this.set('birthday_error', birthday_error);
            throw new Error(birthday_error);
          }

          model.set('birthday', birthday.toDate());

          if (this.get('alreadyCreated')) {
            model.set('current_password', password);
          } else {
            model.set('password', password);
          }
        },
        afterSave: afterSave
      };

      this.get('targetObject').send('save', this, defer, params);
    }
  },
});
