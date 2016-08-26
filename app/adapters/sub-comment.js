import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  createRecord(store, type, snapshot) {
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    var url = snapshot.record.get('comment').get('_internalModel')._relationships.initializedRelationships.comments.link;

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    data.type = 'comments';
    data.data.type = 'comments';

    return this.ajax(url, "POST", { data: data });
  },
});
