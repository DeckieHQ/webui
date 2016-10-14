import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    model.rollbackAttributes();
  },

  renderTemplate: function() {
    this.render('event/edit', { into: 'application' });
  }
});
