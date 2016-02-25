import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    verify_email: function(defer) {
      let verification = this.store.createRecord('verification');
      verification.set('type', 'email');

      return verification.save()
        .then(defer.resolve)
        .catch((reason) => {
          defer.reject(reason);
        })
      ;
    },

    verify_phone_number: function(defer) {
      let verification = this.store.createRecord('verification');
      verification.set('type', 'phone_number');

      return verification.save()
        .then(() => {
          defer.resolve;
          this.transitionToRoute('verification-phone-number');
        })
        .catch((reason) => {
          defer.reject(reason);
        })
      ;
    }
  }
 });
