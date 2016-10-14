import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(modelName) {
    return Ember.String.underscore(modelName);
  },

  urlForCreateRecord(modelName) {
    return this._buildURL('user/'+modelName);
  },
});
