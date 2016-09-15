import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  deactivate: function() {
    var model = this.currentModel;
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  model: function() {
    return this.store.createRecord('feedback');
  },

  afterModel: function(model) {
    if (this.get('session.isAuthenticated')) {
      return model.set('email', this.get('currentUser.email'));
    }
  }
});
