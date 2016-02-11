import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);

    let birthday = model.get('birthday');

    controller.set('day', moment(birthday).format("D"));
    controller.set('month', moment(birthday).format("MMMM"));
    controller.set('year', moment(birthday).format("YYYY"));
  },
});
