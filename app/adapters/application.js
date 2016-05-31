import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import HasManyQuery from 'ember-data-has-many-query';

import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, HasManyQuery.RESTAdapterMixin, {
  authorizer: 'authorizer:devise',

  host: ENV.apiURL,
});
