import Ember from 'ember';

import ENV from '../config/environment';

export default Ember.Route.extend({
  model: function() {
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

    return new Promise(function(resolve, reject) {
      index.search('', searchParams, function searchDone(err, content) {
        if (err) { return reject(err); }

        resolve(content.hits.slice(0, 2));
      });
    });
  }
});
