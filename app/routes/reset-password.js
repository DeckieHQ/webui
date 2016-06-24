import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord('reset-password');
  },

  afterModel(model) {
    let params = this.paramsFor('reset-password');

    return model.set('reset_password_token', params.token);
  }
});
