import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  i18n: Ember.inject.service(),

  userObserver: Ember.observer('currentUser.content', function(sender, key, value, rev) {
    if (!this.get('currentUser').content) {
      this.set('hosted_events', null);
      this.set('submissions', null);
      this.set('last_achievement', null);
    }
  }),

  setHostedEvents() {
    if (this.get('currentUser').content) {
      return this.get('currentUser').get('hosted_events').then(
        (events) => {
          this.set('hosted_events', events.slice(0, 3));
        }
      );
    }
  },

  setSubmissions() {
    if (this.get('currentUser').content) {
      return this.get('currentUser').content.query('submissions', { include: 'event' }).then(
        (submissions) => {
          this.set('submissions', submissions.slice(0, 3));
        }
      );
    }
  },

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
    if (this.get('currentUser').content) {
      return this.get('currentUser').get('hosted_events').then(
        (events) => {
          this.set('hosted_events', events.slice(0, 3));
        }
      );
    }
  }.property('currentUser.content'),

  submissions: function(){
    if (this.get('currentUser').content) {
      return this.get('currentUser').content.query('submissions', { include: 'event' }).then(
        (submissions) => {
          this.set('submissions', submissions.slice(0, 3));
        }
      );
    }
  }.property('currentUser.content'),

  last_achievement: function(){
    if (this.get('currentUser').content) {
      return this.get('currentUser').get('profile').then(
        (profile) => profile.get('achievements')
      ).then(
        (achievements) => {
          let last_achievement = achievements.get('lastObject')
          let translated = this.get('i18n').t('achievement.'+last_achievement.get('name'));
          this.set('last_achievement', translated);
        }
      );
    }
  }.property('currentUser.content'),
});
