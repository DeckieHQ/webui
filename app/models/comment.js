import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr(),
  private: DS.attr(),
  event: DS.belongsTo('event'),
});
