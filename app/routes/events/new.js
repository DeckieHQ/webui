import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var model = this.currentModel;
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  model: function() {
    return this.store.createRecord('event');
  }
});
