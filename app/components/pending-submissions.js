import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default Ember.Component.extend({
  pendingSubmissionsCount: function() {
    return this.get('event').get('submissions_count') - this.get('event').get('attendees_count');
  }.property(),

  hasPendingSubmissions: function() {
    return this.get('pendingSubmissionsCount') > 0;
  }.property('pendingSubmissionsCount'),

  showPendingSubmissions: false,

  actions: {
    display_pending_submissions: function() {
      if (this.get('showPendingSubmissions')) {
        this.toggleProperty('showPendingSubmissions');
      } else {
        this.get('event').query('submissions', { include: 'profile' })
          .then((submissions) => {
            this.toggleProperty('showPendingSubmissions');
            let pendingSubmissions = submissions.filter((s) => s.get('status') == 'pending');
            return this.set('pendingSubmissions', pendingSubmissions);
        })
      }
    },

    accept_submission: function(submission) {
      submission.save().then(() => {
        this.set('pendingSubmissionsCount', this.get('pendingSubmissionsCount') - 1);

        if (!this.get('hasPendingSubmissions')) {
          this.toggleProperty('showPendingSubmissions');
        }
      });
    },
  }
});
