import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit: function() {
      this.set('isSaving', true);

      let defer = Ember.RSVP.defer();

      defer.promise.then(() => {
        this.set('isSaving', false);
        this.set('isSaved', true);
      }).catch((error) => {
        this.set('isSaving', false);
      });

      return this.get('targetObject').send(this.get('actionOnSubmit'), defer);
    }
  }
});
