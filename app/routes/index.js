import Ember from 'ember';

import ENV from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('location', '').then(
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

    return new Promise(function(resolve, reject) {
      index.search('', searchParams, function searchDone(err, content) {
        if (err) { return reject(err); }

        resolve(content.hits.slice(0, 3));
      });
    });
  }
});
