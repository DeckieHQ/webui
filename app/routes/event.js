import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    var controller = this.get('controller');
    controller.set('message', null);
    controller.set('isPrivate', false);
    controller.set('displayHostContact', false);
    controller.set('email', null);
    controller.set('emailSent', false);
    controller.set('emailError', false);
    controller.set('user_submission', "");
    controller.set('displayTimeSlots', false);
  },

  session: Ember.inject.service(),

  model: function(params) {
    return this.store.find('event', params.event_id).catch(
      () => this.transitionTo('event-not-found')
    );
  },

  afterModel(model) {
    let isAuthenticated = this.get('session.isAuthenticated');

    if (model.get('flexible')) {
      let params = {
        include: 'time_slot_submissions',
      };

      return model.query('time_slots_members', params).then((time_slots_members) => {
        this.controllerFor('event').set('time_slots_members', time_slots_members);

        return time_slots_members.forEach((member) => member.get('time_slot_submissions'))
      })
      .then(() => {
        let params = {
          sort: 'begin_at',
        };

        return model.query('time_slots', params).then((time_slots) => {
          let isMember = false;

          time_slots.forEach((time_slot => {
            if (time_slot.get('member')) {
              isMember = true;
            }
          }));

          this.controllerFor('event').set('isFlexibleMember', isMember);

          return this.controllerFor('event').set('time_slots', time_slots);
        })
      })
      .then(() => model.get('comments'))
      .then(() => {
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
      })
    }
  },
});
