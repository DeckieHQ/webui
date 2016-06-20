import Ember from 'ember';
import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.find('notification', params.notification_id);
  },
  afterModel: function(model) {
    let action = model.get('action'),
      resource = action.get('_internalModel')._relationships.initializedRelationships.resource.canonicalState

    this.transitionTo(`/${resource.modelName}/${resource.id}`);
  }
});
