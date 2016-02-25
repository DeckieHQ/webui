import DS from 'ember-data';

export default DS.Model.extend({
  nickname: DS.attr(),
  display_name: DS.attr(),
  short_description: DS.attr(),
  description: DS.attr(),
});
