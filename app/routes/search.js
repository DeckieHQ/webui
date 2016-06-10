import _ from 'lodash/lodash';
import Ember from 'ember';

import ENV from '../config/environment';

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<label>' + title + '</label>';
}

let Search = Ember.Object.extend({
  result: { hits: [] }
});

export default Ember.Route.extend({
  model() {
    return Search.create();
  },
  afterModel: function() {
    if (!navigator.geolocation) { return this._loadSearch(); }

    let self = this;

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(position) {
      return self.instantSearch(position.coords);
    }).catch(function(err) {
      return self.instantSearch();
    });
  },
  instantSearch: function(coords) {
    Ember.run.scheduleOnce('afterRender', this, function () {
      let initParameters = _.cloneDeep(ENV.algolia);

      if (coords != null) {
        initParameters.searchParameters = {
          aroundLatLng: `${coords.latitude}, ${coords.longitude}`
        };
      }

      let search = instantsearch(initParameters),
        widgets = [
        instantsearch.widgets.searchBox({
          container: '#search-input',
          placeholder: 'Search for events'
        }),
        instantsearch.widgets.hits({
          container: '#hits',
          hitsPerPage: 10,
          templates: {
            item: getTemplate('hit'),
            empty: getTemplate('no-results')
          }
        }),
        instantsearch.widgets.stats({
          container: '#stats'
        }),
        instantsearch.widgets.pagination({
          container: '#pagination'
        }),
        instantsearch.widgets.refinementList({
          container: '#category',
          attributeName: 'category',
          limit: 10,
          operator: 'or',
          templates: {
            header: getHeader('Category:')
          }
        }),
        instantsearch.widgets.refinementList({
          container: '#ambiance',
          attributeName: 'ambiance',
          limit: 10,
          operator: 'or',
          templates: {
            header: getHeader('Expected ambiance:')
          }
        }),
        instantsearch.widgets.refinementList({
          container: '#level',
          attributeName: 'level',
          limit: 10,
          operator: 'or',
          templates: {
            header: getHeader('Minimum level required:')
          }
        })
      ];
      widgets.forEach(search.addWidget, search);

      search.start();

      search.helper.on('result', this.eventsHandler(this));
    });
  },
  eventsHandler: function(context) {
    return function(results) {
      context.modelFor('search').set('result', results);
    }
  }
});
