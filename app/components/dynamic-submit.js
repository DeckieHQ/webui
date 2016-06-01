import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit: function() {
      this.set('hasFailed', false);
      this.set('isSaving', true);

      let defer = Ember.RSVP.defer();

      defer.promise.then(() => {
        this.set('isSaving', false);
        this.set('isSaved', true);
      }).catch((reason) => {
        this.set('isSaving', false);
        this.set('hasFailed', true);
        this.set('errorMessage', (reason.error || reason.message));
      });

      return this.get('targetObject').send(this.get('actionOnSubmit'), defer);
    }
  }
});
