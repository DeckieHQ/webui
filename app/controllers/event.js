import _ from 'lodash';
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),
  infos: Ember.inject.service(),

  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  onlyPrivates: false,

  isPrivate: false,

  eventUrl: function() {
    return 'https://www.deckie.fr/event/' + this.get('model.id');
  }.property('model'),

  minPlayersCount: function() {
    return this.get('model.min_capacity') + 1;
  }.property('model.min_capacity'),

  minCapacityReached: function() {
    return (this.get('model').get('attendees_count') - this.get('model').get('min_capacity')) >= 0
  }.property('model.min_capacity', 'model.attendees_count'),

  isHost: function() {
    return this.get('currentUser').get('profile.id') == this.get('model.host.id');
  }.property('currentUser.content', 'model.host'),

  isModerator: function() {
    return this.get('currentUser.moderator');
  }.property('currentUser.moderator'),

  isMember: function() {
    return this.get('isHost') || this.get('confirmed');
  }.property('confirmed', 'isHost'),

  isAbleToEdit: function() {
    return this.get('isModerator') || (this.get('isHost') && this.get('model.opened'));
  }.property('isModerator', 'isHost', 'model.opened'),

  isAbleToInvite: function() {
    return (this.get('isHost') || this.get('isMember')) && this.get('model.opened');
  }.property('isHost', 'isMember', 'model.opened'),

  isAuthenticated: function() {
    return this.get('session.isAuthenticated');
  }.property('session.isAuthenticated'),

  displayPrivateComments: function() {
    return this.get('isMember') && this.get('model.private_comments_count') > 0
  }.property('isMember'),

  status: function() {
    let user_submission = this.get('user_submission');

    return user_submission ? user_submission.get('status') : "";
  }.property('user_submission'),

  pending: function() {
    return this.get('status') == 'pending';
  }.property('status'),

  confirmed: function() {
    return this.get('status') == 'confirmed';
  }.property('status'),

  pendingSubmissions: function() {
    if (this.get('submissions')) {
      return this.get('submissions').filter((s) => s.get('status') == 'pending');
    } else {
      return null;
    }
  }.property('submissions'),

  full: Ember.computed('model.attendees.length', function() {
    return this.get('model.attendees.length') >= this.get('model.capacity');
  }),

  actions: {
    join_event: function(defer) {
      if (!this.get('session.isAuthenticated')) {
        return this.transitionToRoute('login-or-registration').then((newRoute) => {
          newRoute.controller.set('transitonToRecord', this.get('model'));
        });
      };

      if (this.get('status') == "") {
        let submission = this.store.createRecord('submission', {
          event: this.get('model')
        });

        let params = {
          afterSave: () => {
            this.set('user_submission', submission);
            this.notifyPropertyChange('user_submission');
            this.get('currentUser').get('submissions').pushObject(submission);
            this.get('infos').setSubmissions();
            if (submission.get('status') == 'confirmed') {
              let count = this.get('model.attendees_count') + 1;
              this.set('model.attendees_count', count);
              this.get('model').get('attendees').reload();
            }
          },
          model: submission
        };

        let defer = Ember.RSVP.defer();

        this.send('save', this, defer, params);
      }
    },

    show_time_slots: function() {
      this.set('displayTimeSlots', true);
    },

    hide_time_slots: function() {
      let isMember = false;

      this.get('time_slots').forEach((time_slot => {
        if (time_slot.get('member')) {
          isMember = true;
        }
      }));

      this.set('isNewFlexibleMember', isMember);
      this.set('displayTimeSlots', false);
    },

    pick_time_slot: function(time_slot) {
      if (confirm(this.get('i18n').t('event.confirm-time-slot'))) {
        time_slot.save().then(() => {
          window.location.reload(true);
        }).catch(() => {
          window.location.reload(true);
        })
      }
    },

    quit_event: function() {
      if (confirm(this.get('i18n').t('event.confirm-quit'))) {
        let status = this.get('status');
        this.get('user_submission').destroyRecord().then(
          () => {
            this.set('user_submission', null);
            this.get('infos').setSubmissions();
            if (status == 'confirmed') {
              let count = this.get('model.attendees_count') - 1;
              this.set('model.attendees_count', count);
              this.get('model').get('attendees').reload();
            }
          }
        );
      }
    },

    delete_event: function() {
      if (confirm(this.get('i18n').t('event.confirm-delete'))) {
        this.get('model').destroyRecord().then(
          () => {
            this.get('infos').setHostedEvents();
            return this.transitionToRoute('index');
          }
        );
      }
    },

    display_host_contact: function() {
      this.set('displayHostContact', true);
    },

    send_invitation: function(defer) {
      this.set('emailSent',  false);
      this.set('emailError', false);

      let event = this.get('model'),
          store = this.store,
          emails = this.get('email').split(',').join(' ')
            .split(';').join(' ').split('-').join(' ')
            .split('_').join(' ').split('"').join(' ')
            .split('<').join(' ').split('>').join(' ')
            .split(/\s+/).filter(Boolean)

      let invitations = _.map(emails, email => {
        return store.createRecord('invitation', { email: email, event: event })
        .save().then(() => { return; }).catch(() => { return; });
      });
      return Promise.all(invitations).then(() => {
        this.set('email',     null);
        this.set('emailSent', true);

        defer.resolve();
      });
    },

    accept_submission: function(submission) {
      submission.save().then(() => {
        submission.set('status', 'confirmed');
        this.notifyPropertyChange('submissions');
        let count = this.get('model.attendees_count') + 1;
        this.set('model.attendees_count', count);
        this.get('model').get('attendees').reload();
      });
    },

    comment: function(defer) {
      let comment = this.store.createRecord('comment', {
        message: this.get('message'),
        private: this.get('isPrivate'),
        author: this.get('currentUser').get('profile'),
        event: this.get('model')
      });

      let params = {
        afterSave: () => {
          this.set('message', null);
          this.set('isPrivate', false);
        },
        model: comment
      }

      this.send('save', this, defer, params);
    },
  }
 });
