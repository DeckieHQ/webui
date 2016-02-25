import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DS from 'ember-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function() {
    let params = this.paramsFor('verification-email');
    let verification = this.store.createRecord('verification-extend');
    verification.set('type', 'email');
    verification.set('token', params.token);

    let result = {};

    return verification.save()
      .then(() => {
        result['verified'] = true;
        this.set('result', result)
      })
      .catch((reason) => {
        result['verified'] = false;
        result['reason'] = reason.message;
        this.set('result', result)
      })
    ;
  },

  model: function(params) {
    return this.get('result');
  },
});
