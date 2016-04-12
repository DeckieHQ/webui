import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('profile'),
  message: DS.attr(),
  private: DS.attr(),
  event: DS.belongsTo('event'),
});