import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    let verification = this.store.createRecord('verification-extend');
    verification.set('type', 'phone_number');

    return verification;
  },
});
