import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForQuery(query, modelName) {
    return this._buildURL('user/'+modelName);
  },
});
