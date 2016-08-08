import DS from 'ember-data';

export default DS.Model.extend({
  event: DS.belongsTo('event'),
  begin_at: DS.attr(),
  member: DS.attr(),
  members: DS.hasMany('profile'),
  time_slot_submissions: DS.hasMany('time-slot-submission'),
});
