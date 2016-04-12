import DS from 'ember-data';

export default DS.Model.extend({
  event: DS.belongsTo('event', {
    inverse: 'submissions'
  }),
  status: DS.attr(),
});
