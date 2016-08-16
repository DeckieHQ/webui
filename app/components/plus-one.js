import Ember from 'ember';

export default Ember.Component.extend({
  attendeesCount: function () {
    return this.get('event.attendees_count') + 1;
  }.property('event'),

  minCapacity: function () {
    return this.get('event.min_capacity') + 1;
  }.property('event'),

  capacity: function () {
    return this.get('event.capacity') + 1;
  }.property('event'),
});
