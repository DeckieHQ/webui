import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  host: DS.belongsTo('profile'),
  title: DS.attr(),
  category: DS.attr(),
  ambiance: DS.attr(),
  level: DS.attr(),
  capacity: DS.attr(),
  begin_at: DS.attr('date'),
  end_at: DS.attr('date'),
  title: DS.attr(),
  description: DS.attr(),
  short_description: DS.attr(),
  attendees_count: DS.attr(),
  street: DS.attr(),
  postcode: DS.attr(),
  city: DS.attr(),
  country: DS.attr(),
  latitude: DS.attr(),
  longitude: DS.attr(),
  auto_accept: DS.attr(),
  comments: DS.hasMany('comment'),
  attendees: DS.hasMany('profile'),
  submissions: DS.hasMany('submission'),
  user_submission: DS.belongsTo('submission'),
});
