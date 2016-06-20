import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  type: DS.attr(),
  viewed: DS.attr(),
  action: DS.belongsTo('action'),
});
