import Ember from 'ember';

import ENV from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    let client = instantsearch(ENV.algolia).client,
         index = client.initIndex(ENV.algolia.indexName);

    return new Promise(function(resolve, reject) {
      index.search('', function searchDone(err, content) {
        if (err) { return reject(err); }

        resolve(content.hits.slice(0, 2));
      });
    });
  }
});
