import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    var controller = this.get('controller');
    controller.set('message', null);
    controller.set('isPrivate', false);
  },

  session: Ember.inject.service(),

  model: function(params) {
    return this.store.find('event', params.event_id);
  },

  //TODO: not needed if user not authenticated or host
  afterModel(model) {
    if (this.get('session.isAuthenticated')) {
      return model.get('user_submission')
        .then((submission) => {
          if (submission) {
            return this.controllerFor('event').set('user_submission', submission);
          }
        })
        .then(() => {
          let isHost = this.get('currentUser').get('profile.id') == model.get('host.id');

          if (isHost) {
            return model.query('submissions', { include: 'profile' });
          }
        })
        .then((submissions) => {
          if (submissions) {
            return this.controllerFor('event').set('submissions', submissions);
          }
        })
      ;
    }
  },
});
