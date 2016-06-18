import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

export default imageCropper.extend({
  //override default options of cropper
  aspectRatio: 1,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',
  croppedAvatar: null,

  actions: {
    getCroppedAvatar: function(defer) {
      var container = this.$(this.get('cropperContainer'));
      var croppedImage = container.cropper('getCroppedCanvas');

      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.width = 500;
      canvas.height = 500;
      context.drawImage(croppedImage, 0, 0, canvas.width, canvas.height);

      this.set('profile.avatar', canvas.toDataURL("image/jpeg"));

      this.get('targetObject').send('save', defer);
    }
  }
});
