import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  deactivate: function() {
    var controller = this.get('controller');
    controller.set('eventsType', 'opened');
  },

  model: function() {
    let params = {
      include: 'event',
      sort: 'event.begin_at',
      filters: {
        event: {
          opened: true
        }
      },
    };
    return this.modelFor('account').query('submissions', params);
  }
});
