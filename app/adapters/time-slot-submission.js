import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    return snapshot.record.get('time_slot').get('_internalModel')._relationships.initializedRelationships.time_slot_submissions.link;
  },
});
