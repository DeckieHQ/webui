import Ember from 'ember';

export default Ember.Controller.extend({
  opened: true,

  actions: {
    toggle_events: function() {
      let opened = this.get('opened');
      let sort = opened ? '-begin_at' : 'begin_at';

      let params = {
        sort: sort,
        filters: {
          opened: !opened
        }
      }

      return this.get('currentUser').content.query('hosted_events', params).then(
        (events) => {
          this.set('model', events);
          this.toggleProperty('opened');
        }
      );
    },
  }
 });
