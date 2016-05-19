import DS from 'ember-data';

export default DS.Model.extend({
  profile: DS.belongsTo('profile'),
  email: DS.attr(),
  phone_number: DS.attr(),
});
