import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  actions: {
    update_profile: function(defer) {
      this.set('updated', false);

      let params = {
        afterSave: () => {
          this.set('updateAvatar', false);
          this.set('updated', true);
        }
      };

      this.send('save', this, defer, params);
    },

    update_avatar: function() {
      this.set('updated', false);
      this.get('model').rollbackAttributes();
      this.set('updateAvatar', true);
    },

    cancel: function() {
      this.set('updateAvatar', false);
    },
  }
 });
