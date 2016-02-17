import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    verify_email: function(defer) {
      let verification = this.store.createRecord('verification');
      verification.set('type', 'email');
      
      return verification.save()
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          defer.reject(reason);
        })
      ;
    }
  }
 });
