import Ember from 'ember';

export default Ember.Controller.extend({
  type: 'opened',

  emptyLabel: function() {
    return `account.attended-events.empty-${this.get('type')}`;
  }.property('type'),

  actions: {
    toggleOpenedEvents: function() {
      return this._getSubmissions(true);
    },
    toggleClosedEvents: function() {
      return this._getSubmissions(false);
    },
    toggleFlexibleEvents: function() {
      return this.get('currentUser.profile').then(profile => {
        let params = { include: 'time_slot,time_slot.event' };

        return profile.query('time_slot_submissions', params);
      }).then(timeSlotSubmissions => {
        console.log(timeSlotSubmissions);
        
        this.set('model', timeSlotSubmissions);

        this.set('type', 'flexible');
      });
    }
  },
  _getSubmissions: function(opened) {
    let params = { include: 'event', sort: 'event.begin_at', filters: { event: { opened: true } } };

    if (!opened) {
      params.sort = `-${params.sort}`

      params.filters.event.opened = false;
    }
    return this.get('currentUser').content.query('submissions', params).then(
      (submissions) => {
        this.set('model', submissions);

        this.set('type', opened ? 'opened' : 'closed');
      }
    );
  }
 });
