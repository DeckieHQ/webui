import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('event', params.event_id);
  },

  //TODO: not needed if user not authenticated or host
  afterModel(model) {
    return model.get('user_submission').then((submission) => {
      return this.controllerFor('event').set('user_submission', submission);
    });
  },
});
