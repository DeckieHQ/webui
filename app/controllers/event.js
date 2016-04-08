import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

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
