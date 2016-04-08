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

  actions: {
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
