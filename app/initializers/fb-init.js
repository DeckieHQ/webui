export default {
  name: 'fb-init',
  initialize: function(container, application){
    application.inject('component:fb-share', 'socialApiClient', 'service:facebook-api-client');
  }
};
