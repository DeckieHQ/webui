import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    let params = {
      include: 'event',
      sort: 'event.begin_at',
      filters: {
        event: 'opened'
      },
    };

    return this.modelFor('account').query('submissions', params);
  }
});
