import Ember from 'ember';

export default Ember.Controller.extend({
  earlyRegistration: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'early-registration'
    );
  }.property(),

  firstFeedback: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'first-feedback'
    );
  }.property(),

  earlyEvent: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'early-event'
    );
  }.property(),

  verifiedProfile: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'verified-profile'
    );
  }.property(),

  firstInvitation: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'first-invitation'
    );
  }.property(),

  firstFlexibleEvent: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'first-flexible-event'
    );
  }.property(),

  firstUnlimitedEventCapacity: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'first-unlimited-event-capacity'
    );
  }.property(),

  firstRecurrentEvent: function() {
    return this.get('model').find(
      (achievement) => achievement.get('name') === 'first-recurrent-event'
    );
  }.property(),
 });
