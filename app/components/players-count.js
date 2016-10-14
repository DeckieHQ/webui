import Ember from 'ember';

export default Ember.Component.extend({
  playersCount: function () {
    return this.get('event.attendees_count') + 1;
  }.property('event.attendees_count'),
});
