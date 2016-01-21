import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let User = DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr(),
  birthday: DS.attr('date', { defaultValue: new Date("October 13, 1988 11:13:00") }),
  phone_number: DS.attr(),
  password: DS.attr(),
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
    password: {
      presence: true
    }
  }
});

export default User;
