import Ember from 'ember';

export default Ember.Controller.extend({
  opened: true,

  actions: {
    toggle_events: function() {
      let opened = this.get('opened');
      let sort = opened ? '-event.begin_at' : 'event.begin_at';

      let params = {
        include: 'event',
        sort: sort,
        filters: {
          event: {
            opened: opened
          }
        }
      }

      return this.get('currentUser').content.query('submissions', params).then(
        (submissions) => {
          this.set('model', submissions);
          this.toggleProperty('opened');
        }
      );
    },
  }
 });
