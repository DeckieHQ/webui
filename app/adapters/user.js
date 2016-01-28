import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForUpdateRecord: function(id, modelName, snapshot) {
    return this._buildURL(modelName, '');
  },
});
