import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    return this.get('host')+"/user/password";
  },

  createRecord: function(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    return this.ajax(url, "PATCH", { data: data });
  }
});
