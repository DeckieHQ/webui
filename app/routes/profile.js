import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('profile', params.profile_id);
  },

  afterModel(model) {
    let params = {
      sort: 'begin_at',
      filters: {
        opened: true
      },
    };

    return model.query('hosted_events', params);
  }
});
