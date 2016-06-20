import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    model.rollbackAttributes();
    this.controllerFor('account.profile').set('updated', false);
  },

  model: function() {
    return this.modelFor('account').get('profile');
  },
});
