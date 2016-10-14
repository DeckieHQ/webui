import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    model.set('password', null);
    model.set('current_password', null);
    model.set('confirm_password', null);
    this.controllerFor('account.change-password').set('updated', false);
  },
});
