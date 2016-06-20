import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  validations: {
    message: {
      presence: true,
      length: { maximum: 200 }
    }
  },

  onlyPrivates: false,

  isPrivate: false,

  minCapacityReached: function() {
    return (this.get('model').get('attendees_count') - this.get('model').get('min_capacity')) >= 0
  }.property('model.min_capacity', 'model.attendees_count'),

  isHost: function() {
    return this.get('currentUser').get('profile.id') == this.get('model.host.id');
  }.property(),

  isMember: function() {
    return this.get('isHost') || this.get('confirmed');
  }.property('confirmed'),

  displayPrivateComments: function() {
    return this.get('isMember') && (this.get('model.private_comments_count') > 0)
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
    return this.get('submissions').filter((s) => s.get('status') == 'pending');
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
            this.get('model').get('attendees').reload();
          },
          model: submission
        };

        let defer = Ember.RSVP.defer();

        this.send('save', this, defer, params);
      }
    },

    quit_event: function() {
      if (confirm(this.get('i18n').t('event.confirm-quit'))) {
        this.get('user_submission').destroyRecord().then(
          () => this.set('user_submission', null)
        );
      }
    },

    display_host_contact: function() {
      this.set('displayHostContact', true);
    },

    accept_submission: function(submission) {
      submission.save().then(() => {
        submission.set('status', 'confirmed');
        this.notifyPropertyChange('submissions');
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
