import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  author: DS.belongsTo('profile'),
  message: DS.attr(),
  private: DS.attr(),
  created_at: DS.attr(),
  event: DS.belongsTo('event'),
  comments: DS.hasMany('sub-comment'),
});
