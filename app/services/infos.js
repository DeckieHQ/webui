import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  i18n: Ember.inject.service(),
  store: Ember.inject.service(),

  userObserver: Ember.observer('currentUser.content', function() {
    if (!this.get('currentUser').content) {
      this.set('hosted_events', null);
      this.set('submissions', null);
      this.set('last_achievement', null);
    }
  }),

  setHostedEvents() {
    if (this.get('currentUser').content) {
      let params = {
        sort: 'begin_at',
        filters: {
          not_type: 'recurrent',
          opened: true,
        }
      };

      return this.get('currentUser').content.query('hosted_events', params).then(
        (events) => {
          this.set('hosted_events', events.slice(0, 3));
        }
      );
    }
  },

  setSubmissions() {
    if (this.get('currentUser').content) {
      let params = {
        sort: 'event.begin_at',
        filters: {
          event: {
            opened: true
          }
        },
        include: 'event'
      };

      return this.get('currentUser').content.query('submissions', params).then(
        (submissions) => {
          this.set('submissions', submissions.slice(0, 3));
        }
      );
    }
  },

  init() {
    this._super(...arguments);
    return this.get('store').find('location', '').then(
      (location) => this._loadSearch(location)
    ).catch(
      () => this._loadSearch()
    );
  },

  _loadSearch: function(coords = null) {
    let client = instantsearch(ENV.algolia).client,
         index = client.initIndex(ENV.algolia.indexName),
         searchParams = {};

     if (coords != null) {
       searchParams = { aroundLatLng: `${coords.get('latitude')}, ${coords.get('longitude')}` };
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
      let params = {
        sort: 'begin_at',
        filters: {
          not_type: 'recurrent',
          opened: true
        }
      };

      return this.get('currentUser').content.query('hosted_events', params).then(
        (events) => {
          this.set('hosted_events', events.slice(0, 3));
        }
      );
    }
  }.property('currentUser.content'),

  submissions: function(){
    if (this.get('currentUser').content) {
      let params = {
        sort: 'event.begin_at',
        filters: {
          event: {
            opened: true
          }
        },
        include: 'event'
      };

      return this.get('currentUser').content.query('submissions', params).then(
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
          let last_achievement = achievements.get('lastObject');
          if (last_achievement) {
            let translated = this.get('i18n').t('achievement.'+last_achievement.get('name'));
            this.set('last_achievement', translated);
          } else {
            this.set('last_achievement', null);
          }
        }
      );
    }
  }.property('currentUser.content'),
});
