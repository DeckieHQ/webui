import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);

    let begin_at = model.get('begin_at');
    let end_at = model.get('end_at');

    controller.set('begin_at_hour', moment(begin_at).hour());
    controller.set('begin_at_minute', moment(begin_at).minute());

    if (end_at) {
      controller.set('end_at_hour', moment(end_at).hour());
      controller.set('end_at_minute', moment(end_at).minute());
    } else {
      controller.set('end_at_hour', 22);
      controller.set('end_at_minute', 30);
    }
  },

  renderTemplate: function() {
    this.render('event/edit', { into: 'application' });
  }
});
