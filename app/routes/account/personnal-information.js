import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    model.rollbackAttributes();
    model.set('current_password', null);
    this.controllerFor('account.personnal-information').set('updated', false);
  },
});
