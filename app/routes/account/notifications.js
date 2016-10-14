import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.query('notification', { sort: '-action.created_at', include: 'action,action.actor' });
  },

  afterModel() {
    return this.get('currentUser').get('preferences').then(
      (preferences) => this.controllerFor('account.notifications').set('preferences', preferences)
    );
  }
});
