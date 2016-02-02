import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);

    let birthday = model.get('birthday');

    controller.set('day', birthday.getDate());
    controller.set('month', birthday.getMonth() + 1);
    controller.set('year', birthday.getFullYear());
  },

  //TODO: utiliser momentJS pour les dates
});
