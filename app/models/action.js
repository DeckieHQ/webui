import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  created_at: DS.attr(),
  type: DS.attr(),
  actor: DS.belongsTo('profile'),
  resource: DS.belongsTo('resource'),
  top_resource: DS.belongsTo('event'),
});
