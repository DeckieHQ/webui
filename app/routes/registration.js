import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  deactivate: function() {
    var model = this.currentModel;
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  model: function() {
    return this.store.createRecord('user');
  }
});
