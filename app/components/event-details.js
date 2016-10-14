import Ember from 'ember';

export default Ember.Component.extend({
  minPlayersCapacity: function () {
    return this.get('event.min_capacity') + 1;
  }.property('event'),

  maxPlayersCapacity: function () {
    return this.get('event.capacity') + 1;
  }.property('event'),
});
