import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  beforeModel: function() {
    this._super.apply(this, arguments);

    let result = {};

    if (this.get('currentUser.email_verified')) {
      result['alreadyVerified'] = true;
      this.set('result', result);
    } else {
      let params = this.paramsFor('email-verification');
      let verification = this.store.createRecord('verification-extend');
      verification.set('type', 'email');
      verification.set('token', params.token);

      return verification.save()
        .then(() => {
          result['verified'] = true;
          this.set('result', result);
          this.set('currentUser.email_verified', true);
        })
        .catch(() => {
          result['verified'] = false;
          this.set('result', result);
        })
      ;
    }
  },

  model: function() {
    return this.get('result');
  },
});
