import Ember from 'ember';
import AuthenticatedRoute from './authenticated-route';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.find('event', params.event_id);
  },
})
