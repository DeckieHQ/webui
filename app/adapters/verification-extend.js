import Ember from 'ember';
import VerificationAdapter from '../adapters/verification';

export default VerificationAdapter.extend({
  createRecord: function(store, type, snapshot) {
    let serializer = store.serializerFor(type.modelName);
    snapshot.modelName = 'verification';
    let data = serializer.serialize(snapshot);
    let url = this.buildURL('verification', null, snapshot, 'createRecord');

    return this.ajax(url, "PATCH", { data: data });
  }
});
