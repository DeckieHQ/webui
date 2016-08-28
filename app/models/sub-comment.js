import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('profile'),
  message: DS.attr(),
  created_at: DS.attr(),
  comment: DS.belongsTo('comment'),
});
