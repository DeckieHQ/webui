import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(modelName) {
    return Ember.String.underscore(modelName+"s");
  },

  updateRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord') + "/confirm";

    return this.ajax(url, 'POST', { data: data });
  },
});
