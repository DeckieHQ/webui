import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    let params = {
      filters: {
        not_type: 'recurrent',
        opened: true
      },
    };

    return this.modelFor('account').query('hosted_events', params);
  },
});
