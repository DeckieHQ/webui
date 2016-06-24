import DS from 'ember-data';

export default DS.Model.extend({
  reset_password_token: DS.attr(),
  password: DS.attr(),
  password_confirmation: DS.attr(),
});
