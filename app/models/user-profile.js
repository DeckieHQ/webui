import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let UserProfile = DS.Model.extend(EmberValidations, {
  email: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  password: DS.attr(),
});

UserProfile.reopen({
  validations: {
    email: {
      presence: true
    },
    firstname: {
      presence: true,
      length: { minimum: 10 }
    },
    lastname: {
      presence: true
    },
    password: {
      presence: true
    }
  }
});

export default UserProfile;
