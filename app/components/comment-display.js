import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  i18n: Ember.inject.service(),

  validations: {
    "comment.message": {
      presence: true,
      length: { maximum: 200 }
    }
  },

  canDelete: function() {
    return this.get('currentUser').get('profile.id') == this.get('comment.author.id') || this.get('isHost');
  }.property('comment'),

  isOwner: function() {
    return this.get('currentUser').get('profile.id') == this.get('comment.author.id');
  }.property('comment'),

  isUpdating: false,

  actions: {
    toggle_update_comment: function() {
      this.toggleProperty('isUpdating');
    },

    update_comment: function(defer) {
      let comment = this.get('comment');
      //TODO: erreurs pas gérées

      return this.validate()
        .then(() => comment.save())
        .then(() => {
          defer.resolve();
          this.toggleProperty('isUpdating');
        })
        .catch((reason) => {
          context.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    },

    cancel_update: function() {
      this.get('comment').rollbackAttributes();
      this.set('isUpdating', false);
    },

    delete_comment: function(comment) {
      if (confirm(this.get('i18n').t('comment.confirm-delete'))) {
        comment.destroyRecord();
      }
    }
  }
});
