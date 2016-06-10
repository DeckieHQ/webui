import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DS from 'ember-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function() {
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
        .catch((reason) => {
          result['verified'] = false;
          this.set('result', result);
        })
      ;
    }
  },

  model: function(params) {
    return this.get('result');
  },
});
