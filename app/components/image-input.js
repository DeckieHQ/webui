import Ember from 'ember';

export default Ember.Component.extend({
  file: null,
  displayCropper: false,
  loadImage: false,
  wrongFormat: false,
  validTypes: [ 'image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/gif'],

  actions: {
    fileSelectionChanged: function(file) {
      if(this.get('validTypes').indexOf(file.type) >= 0) {
        this.set('displayCropper', false);
        this.set('wrongFormat', false);
        this.set('loadImage', true);
        let self = this;
        setTimeout(function(){
          self.set('loadImage', false);
          self.set('displayCropper', true);
        }, 1000);
        this.set('file', file);
        this.set('profile.avatar', file.dataURL);
      } else {
        this.set('displayCropper', false);
        this.set('loadImage', false);
        this.set('wrongFormat', true);
      }
    },

    save: function(defer) {
      this.get('targetObject').send('update_profile', defer);
    },

    cancel: function() {
      this.get('targetObject').send('cancel');
    }
  },
});
