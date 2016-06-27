import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  i18n: Ember.inject.service(),

  validations: {
    "model.email": {
      presence: true,
      inline: validator(function() {
        let regex = new RegExp(/\S+@\S+\.\S+/);
        if (!regex.test(this.model.get('model.email'))) {
          return this.get('i18n').t('error.email');
        };
      })
    },
  },

  actions: {
    submit: function(defer) {
      let params = {
        afterSave: () => this.set('success', true)
      }
      this.send('save', this, defer, params);
    }
  }
});
