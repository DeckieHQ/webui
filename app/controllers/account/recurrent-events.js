import Ember from 'ember';

export default Ember.Controller.extend({
  setRecurrentEvents() {
    let params = {
      filters: {
        type: 'recurrent'
      },
    };

    return this.get('currentUser').content.query('hosted_events', params).then(
      (events) => {
        this.set('events', events.slice);
      }
    );
  },
});
