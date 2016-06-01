import Ember from 'ember';

export default Ember.Component.extend({
  file: null,
  displayCropper: false,

  actions: {
    fileSelectionChanged: function(file) {
      this.set('displayCropper', false);
      let self = this;
      setTimeout(function(){self.set('displayCropper', true);}, 1000);
      this.set('file', file);
      this.set('profile.avatar', file.dataURL);
    },

    save: function(defer) {
      this.get('targetObject').send('update_profile', defer);
    },

    cancel: function() {
      this.get('targetObject').send('cancel');
    }
  },
});
