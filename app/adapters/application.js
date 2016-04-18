import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, HasManyQuery.RESTAdapterMixin, {
  authorizer: 'authorizer:devise',

  host: 'http://0.0.0.0:8080',
});
