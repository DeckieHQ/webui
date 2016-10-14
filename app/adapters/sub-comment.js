import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(modelName) {
    return 'comments';
  },

  createRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = snapshot.record.get('comment').get('_internalModel')._relationships.initializedRelationships.comments.link;

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    data.type = 'comments';
    data.data.type = 'comments';

    return this.ajax(url, "POST", { data: data });
  },

  updateRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    data.type = 'comments';
    data.data.type = 'comments';

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    return this.ajax(url, 'PATCH', { data: data });
  },
});
