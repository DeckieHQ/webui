import DS from 'ember-data';

export default DS.Model.extend({
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
});
