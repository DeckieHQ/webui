import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    verify_phone_number: function(defer) {
      let model = this.get('model');

      return model.validate()
        .then(() => model.save())
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
 });
