import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),

  init() {
    this._super(...arguments);
    if (!navigator.geolocation) { return this._loadSearch(); }

    let self = this;

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return self._loadSearch(position.coords);
    }).catch(function(err) {
      return self._loadSearch();
    });
  },

  _loadSearch: function(coords = null) {
    let client = instantsearch(ENV.algolia).client,
         index = client.initIndex(ENV.algolia.indexName),
         searchParams = {};

     if (coords != null) {
       searchParams = { aroundLatLng: `${coords.latitude}, ${coords.longitude}` };
     }

     let self = this;

    return new Promise(function(resolve, reject) {
      index.search('', searchParams, function searchDone(err, content) {
        if (err) { return reject(err); }

        self.set('events', content.hits.slice(0, 3));
        resolve(content.hits.slice(0, 3));
      });
    });
  },

  hosted_events: function(){
    return this.get('currentUser').get('hosted_events');
  }.property(),

  last_achievements: function(){
    return this.get('currentUser').get('profile').get('achievements');
  }.property(),

  missing_profile_info: function(){
    return !(this.get('currentUser').get('profile.avatar_url') && this.get('currentUser').get('profile.short_description'));
  }.property(),

  missing_verification: function(){
    return !(this.get('currentUser').get('phone_number_verified') && this.get('currentUser').get('email_verified'));
  }.property(),
});
