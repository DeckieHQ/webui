import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  i18n: Ember.inject.service(),

  validations: {
    "model.current_password": {
      presence: true
    },
    "model.password": {
      presence: true,
      length: { minimum: 8 }
    },
    "model.confirm_password": {
      presence: true,
      inline: validator(function() {
        if (this.model.get('model.password') != this.model.get('model.confirm_password')) {
          return this.get('i18n').t("error.password-confirm");
        }
      })
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
