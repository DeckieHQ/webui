import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.find('event', params.event_id);
  },

  afterModel: function(model) {
    if (model.get('recurrent')) {
      return this.transitionTo('event', model);
    }
  }
})
