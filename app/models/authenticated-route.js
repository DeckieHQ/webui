import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  beforeModel(transition) {
    if (!this.get('session').get('isAuthenticated')) {
      this.controllerFor('login').set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
