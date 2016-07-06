import Ember from 'ember';
import EmberValidations from 'ember-validations';
import { validator } from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  init: function() {
    this._super.apply(this, arguments);

    let birthday = this.get('model').get('birthday');

    if (birthday) {
      this.set('day',   moment(birthday).format("DD"));
      this.set('month', moment(birthday).format("M"));
      this.set('year',  moment(birthday).format("YYYY"));
    }
  },

  validations: {
    "model.email": {
      presence: true,
      inline: validator(function() {
        let regex = new RegExp(/\S+@\S+\.\S+/);
        if (!regex.test(this.model.get('model.email'))) {
          return this.get('i18n').t('error.email');
        };
      })
    },
    "model.first_name": {
      presence: true,
      length: { maximum: 64 }
    },
    "model.last_name": {
      presence: true,
      length: { maximum: 64 }
    },
    "model.culture": {
      presence: true
    },
    password: {
      presence: true,
      length: { minimum: 8 }
    },
    birthday: {
      inline: validator(function() {
        let day = parseInt(this.model.day) + 1;
        let date = [ day, this.model.month, this.model.year ].join("-");
        let birthday = moment(date, "DD-MMMM-YYYY");

        if (!birthday.isValid()) {
          return this.get('i18n').t('error.date');
        }
      })
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

  months: [
    { value: '1', label: 'month.january' },
    { value: '2', label: 'month.february' },
    { value: '3', label: 'month.march' },
    { value: '4', label: 'month.april' },
    { value: '5', label: 'month.may' },
    { value: '6', label: 'month.june' },
    { value: '7', label: 'month.jully' },
    { value: '8', label: 'month.august' },
    { value: '9', label: 'month.september' },
    { value: '10', label: 'month.october' },
    { value: '11', label: 'month.november' },
    { value: '12', label: 'month.december' },
  ],

  cultures: [
    { value: 'fr', label: 'culture.fr' },
    { value: 'en', label: 'culture.en' },
  ],

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

      // if(this.get('model.phone_number')[0] != '+') {
      //   let phone_number = '+33' + this.get('model.phone_number').substring(1);
      //   this.set('model.phone_number', phone_number);
      // }

      model.set('culture', 'fr');

      this.set('showCustomError', true);

      let afterSave;

      if (this.get('transition')) {
        afterSave = () => {
          this.get('session').authenticate('authenticator:devise', model.get('email'), password).then(
            () => this.get('targetObject').send('transition')
          );
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
          let birthday = moment(date, "DD-M-YYYY");

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
