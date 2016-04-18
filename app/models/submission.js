import DS from 'ember-data';

export default DS.Model.extend({
  event: DS.belongsTo('event', {
    inverse: 'user_submission'
  }),
  status: DS.attr(),
});
