import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    return snapshot.record.get('event').get('_internalModel')._relationships.initializedRelationships.submissions.link;
  },
});
