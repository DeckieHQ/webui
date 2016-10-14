import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return 'user';
  },

  urlForFindRecord(id, modelName) {
    return this._buildURL(modelName, id) + '?include=profile';
  },

  urlForUpdateRecord: function(id, modelName) {
    return this._buildURL(modelName, '');
  },
});
