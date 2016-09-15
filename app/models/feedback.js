import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  title: DS.attr(),
  description: DS.attr(),
  email: DS.attr(),
});
