import Ember from 'ember';

export default Ember.Route.extend({
  deactivate: function() {
    var model = this.currentModel;
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  model: function() {
    return this.store.createRecord('feedback');
  }
});
