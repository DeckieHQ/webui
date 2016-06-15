import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    model.rollbackAttributes();
  },

  model: function() {
    return this.modelFor('account').get('profile');
  },
});
