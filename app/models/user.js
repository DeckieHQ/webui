import DS from 'ember-data';

export default DS.Model.extend({
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
