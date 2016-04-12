import DS from 'ember-data';

export default DS.Model.extend({
  host: DS.belongsTo('profile'),
  title: DS.attr(),
  category: DS.attr(),
  ambiance: DS.attr(),
  level: DS.attr(),
  capacity: DS.attr(),
  begin_at: DS.attr('date'),
  end_at: DS.attr('date'),
  street: DS.attr(),
  postcode: DS.attr(),
  city: DS.attr(),
  country: DS.attr(),
  auto_accept: DS.attr(),
  comments: DS.hasMany('comment'),
  attendees: DS.hasMany('profile'),
  submissions: DS.hasMany('submission'),
  user_submission: DS.belongsTo('submission'),
});
