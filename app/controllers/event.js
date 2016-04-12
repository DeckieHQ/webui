import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  isHost: function() {
    return this.get('currentUser').get('profile.id') == this.get('model.host.id');
  }.property(),

  status: function() {
    return this.get('model').get('user_submission').get('status');
  }.property(),

  pending: function() {
    return this.get('status') == 'pending';
  }.property(),

  confirmed: function() {
    return this.get('status') == 'confirmed';
  }.property(),

  actions: {
    join_event: function(defer) {
      let submission = this.store.createRecord('submission', {
        event: this.get('model')
      });

      this.send('save', this, defer, null, null, submission);
    },

    quit_event: function(submission) {
      // let submission = this.get('model').get('user_submission');
      console.log(this.get('model.user_submission'));

      //TODO: not working, WHY ?????
      submission.destroyRecord();
    },

    comment: function(defer) {
      let comment = this.store.createRecord('comment', {
        message: this.get('message'),
        event: this.get('model')
      });

      this.send('save', this, defer, null, null, comment);
    },

    delete_comment: function(comment) {
      comment.destroyRecord();
    }
  }
 });
