import Ember from 'ember';
import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.get('currentUser').content;
  },
});
