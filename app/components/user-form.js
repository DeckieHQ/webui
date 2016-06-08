import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service('session'),

  init: function() {
    this._super.apply(this, arguments);

    let birthday = this.get('model').get('birthday');

    if (birthday) {
      this.set('day',   moment(birthday).format("DD"));
      this.set('month', moment(birthday).format("MMMM"));
      this.set('year',  moment(birthday).format("YYYY"));
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
        greaterThanOrEqualTo: moment().subtract(100, 'years').format('YYYY'),
        lessThanOrEqualTo: moment().subtract(18, 'years').format('YYYY')
      }
    }
  },

  months: moment.months(),

  cultures: [ "en" ],

  monthPlaceHolder: function() {
    if (this.get('alreadyCreated')) {
      return null;
    } else {
      return 'user.month.placeholder';
    }
  }.property(),

  passwordPlaceHolder: function() {
    if (this.get('alreadyCreated')) {
      return 'user.password.placeholder.edit';
    } else {
      return 'user.password.placeholder.enter';
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
      if (this.get('alreadyCreated')) {
        this.get('targetObject').set('updated', false);
      }

      let model = this.get('model');
      let password = this.get('password');

      let afterSave;

      if (this.get('transition')) {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password);
          this.get('targetObject').send('transition');
        }
      } else if (this.get('alreadyCreated')) {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password);
          this.get('targetObject').set('updated', true);
        }
      } else {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password);
          this.get('targetObject').transitionToRoute('search');
        }
      }

      let params = {
        beforeSave: () => {
          let day = parseInt(this.get('day')) + 1;
          let date = [ day, this.get('month'), this.get('year') ].join("-");
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
