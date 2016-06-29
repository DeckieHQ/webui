import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    var controller = this.get('controller');
    controller.set('message', null);
    controller.set('isPrivate', false);
    controller.set('displayHostContact', false);
  },

  session: Ember.inject.service(),

  model: function(params) {
    return this.store.find('event', params.event_id);
  },

  afterModel(model) {
    let isAuthenticated = this.get('session.isAuthenticated');

    if (isAuthenticated) {
      return model.get('user_submission')
        .then((submission) => {
          if (submission) {
            return this.controllerFor('event').set('user_submission', submission);
          } else {
            return this.controllerFor('event').set('user_submission', null);
          }
        })
        .then(() => {
          let isHost = this.get('currentUser').get('profile.id') == model.get('host.id');

          if (isHost) {
            return model.query('submissions', { include: 'profile' });
          } else {
            this.controllerFor('event').set('submissions', null);
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
