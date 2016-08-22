import Ember from 'ember';
import _ from 'lodash';

export default Ember.Controller.extend({
  eventsType: 'opened',

  displayFlexibles: function() {
    return this.get('eventsType') == 'flexible';
  }.property('eventsType'),

  emptyLabel: function() {
    return `account.attended-events.empty-${this.get('eventsType')}`;
  }.property('eventsType'),

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
        let ids = [];
        let submissions = [];

        timeSlotSubmissions.forEach((submission) => {
          submission.get('time_slot').then((timeSlot) => timeSlot.get('event'))
          .then((event) => {
            let eventId = event.get('id');

            if (!_.includes(ids, eventId)) {
              ids.push(eventId);
              submissions.pushObject(submission);
            }
          });
        });

        this.set('model', submissions);

        this.set('eventsType', 'flexible');
      });
    }
  },
  _getSubmissions: function(opened) {
    let params = { include: 'event', sort: 'event.begin_at', filters: { event: { opened: true } } };

    if (!opened) {
      params.sort = `-${params.sort}`

      params.filters.event.opened = false;
    }
    return this.get('currentUser').content.query('submissions', params).then(submissions => {
      this.set('model', submissions);

      this.set('eventsType', opened ? 'opened' : 'closed');
    });
  }
 });
