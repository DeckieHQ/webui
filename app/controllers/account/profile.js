import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    update_profile: function(defer) {
      this.send('save', this, defer);
    }
  }
 });
