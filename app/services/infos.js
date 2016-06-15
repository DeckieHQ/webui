import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),

  init() {
    this._super(...arguments);
  },

  hosted_events: function(){
    return this.get('currentUser').get('hosted_events');
  }.property(),

  missing_profile_info: function(){
    return !(this.get('currentUser').get('profile.avatar_url') && this.get('currentUser').get('profile.short_description'));
  }.property(),

  missing_verification: function(){
    return !(this.get('currentUser').get('phone_number_verified') && this.get('currentUser').get('email_verified'));
  }.property(),
});
