import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: 'http://forster-deckie-api.herokuapp.com/user/sign_in'
});
