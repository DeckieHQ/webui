import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return 'user';
  },

  urlForFindRecord(id, modelName, snapshot) {
    return this._buildURL(modelName, id) + '?include=profile';
  },

  urlForUpdateRecord: function(id, modelName, snapshot) {
    return this._buildURL(modelName, '');
  },
});
