import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    let params = {
      filters: {
        type: 'recurrent'
      },
    };

    return this.modelFor('account').query('hosted_events', params);
  },
});
