import DS from 'ember-data';

export default DS.Model.extend({
  time_slot: DS.belongsTo('time-slot'),
  profile: DS.belongsTo('profile'),
});
