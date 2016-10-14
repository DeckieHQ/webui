import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.modelFor('account').get('profile');
  },
});
