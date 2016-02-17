import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let User = DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr(),
  birthday: DS.attr('date'),
  phone_number: DS.attr(),
  culture: DS.attr(),
  password: DS.attr(),
  confirm_password: DS.attr(),
  current_password: DS.attr(),
  email_verified: DS.attr(),
  phone_number_verified: DS.attr(),
});

User.reopen({
  validations: {
    email: {
      presence: true
    },
    first_name: {
      presence: true
    },
    last_name: {
      presence: true
    },
    culture: {
      presence: true
    }
  }
});

export default User;
