import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  queryParams: ['token'],

  i18n: Ember.inject.service(),

  validations: {
    "model.password": {
      presence: true,
      length: {minimum: 8}
    },
    "model.password_confirmation": {
      presence: true,
      inline: validator(function() {
        if (this.model.get('model.password') !== this.model.get('model.password_confirmation')) {
          return this.get('i18n').t("error.password-confirm");
        }
      })
    },
  },

  actions: {
    submit: function(defer) {
      let params = {
        afterSave: () => this.set('success', true),
        fail: () => this.set('invalidToken', true)
      };

      this.send('save', this, defer, params);
    }
  }
});
