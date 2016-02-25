import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    update: function(defer) {
      return this.get('model').save()
        .then(defer.resolve)
        .catch((reason) => {
          // console.log(this.get('model').get('errors').get('nickname')[0].message);
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
 });
