import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForQuery(query, modelName) {
    return this._buildURL('user/'+modelName);
  },

  updateRecord(store, type, snapshot) {
    var url = this.buildURL(type.modelName, snapshot.id, snapshot, 'updateRecord') + '/view';

    return this.ajax(url, 'POST', { data: {} });
  }
});