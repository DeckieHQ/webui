import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  showPrivates: false,

  isPrivate: false,

  isHost: function() {
    return this.get('currentUser').get('profile.id') == this.get('model.host.id');
  }.property(),

  isMember: function() {
    return this.get('isHost') || this.get('confirmed');
  }.property(),

  status: function() {
    let user_submission = this.get('user_submission');

    return user_submission ? user_submission.get('status') : "";
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

    quit_event: function() {
      this.get('user_submission').destroyRecord();
    },

    toggle_private_comments: function() {
      this.toggleProperty('showPrivates');
    },

    comment: function(defer) {
      let comment = this.store.createRecord('comment', {
        message: this.get('message'),
        private: this.get('isPrivate'),
        event: this.get('model')
      });

      this.send('save', this, defer, null, null, comment);
    },

    delete_comment: function(comment) {
      comment.destroyRecord();
    }
  }
 });
