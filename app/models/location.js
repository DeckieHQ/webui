import DS from 'ember-data';

export default DS.Model.extend({
  latitude: DS.attr(),
  longitude: DS.attr(),
});
