import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.find('notification', params.notification_id);
  },
  afterModel: function(model) {
    this.transitionTo(`event`, model.get('action.top_resource'));
  }
});
