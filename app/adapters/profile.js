import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return 'user/profile';
  },

  urlForUpdateRecord: function(id, modelName, snapshot) {
    return this._buildURL(modelName, '');
  },
});
