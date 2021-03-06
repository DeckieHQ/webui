import Ember from 'ember';
import fbComponent from 'ember-social/components/facebook-share';

export default fbComponent.extend({
  showShareDialog: Ember.on('click', function(e){
    this.socialApiClient.clicked({
      url: this.get('url'),
      componentName: 'facebook-share'
    });
    if (this.get('useFacebookUi')) { return; }
    var self = this;
    function showDialog(FB) {
      let title = self.get('title');
      let description =  self.get('description');
      FB.ui(
        {
          method: 'share',
          href: self.get('url'),
          title: title,
          description: description,
          'image:width': '300',
          'image:height': '3000'
        },
        function(response) {
          if (response && !response.error_code) {
            self.socialApiClient.shared('facebook', response);
          } else {
            Ember.Logger.error('Error while posting.');
          }
        }
      );
    }
    if (this.FB) {
      showDialog(this.FB);
    } else {
      this.socialApiClient.load().then(function(FB) {
        showDialog(FB);
      });
    }
    e.preventDefault();
  })
});
