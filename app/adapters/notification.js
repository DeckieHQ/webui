import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForFindAll(modelName, snapshot) {
    return this._buildURL('user/'+modelName);
  },
});
