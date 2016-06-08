import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  //TODO: add password confirmation validation
  validations: {
    "model.current_password": {
      presence: true
    },
    "model.password": {
      presence: true
    },
    "model.confirm_password": {
      presence: true
    },
  },

  actions: {
    change_password: function(defer) {
      this.set('updated', false);

      let params = {
        afterSave: () => {
          this.set('updated', true);
        }
      };

      this.send('save', this, defer, params);
    }
  }
 });
