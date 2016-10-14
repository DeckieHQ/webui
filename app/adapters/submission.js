import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    return snapshot.record.get('event').get('_internalModel')._relationships.initializedRelationships.submissions.link;
  },

  updateRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    var id = snapshot.id;
    var url = this.get('host') + '/submissions/' + id + '/confirm';

    return this.ajax(url, 'POST', { data: data });
  }
});
