import Ember from 'ember';

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h5>' + title + '</h5>';
}

export default Ember.Route.extend({
  model: function() {
    var search = instantsearch({
      appId: 'IU1NEZPMLF',
      apiKey: '6e5ede7d10404d3249e6578f0a91a650', // search only API key, no ADMIN key
      indexName: 'Event_production',
      urlSync: true
    });

    return search;
  },

  actions: {
    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, function () {
        var search = this.currentModel;

        var widgets = [
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
              header: getHeader('Category')
            }
          }),

          instantsearch.widgets.refinementList({
            container: '#ambiance',
            attributeName: 'ambiance',
            limit: 10,
            operator: 'or',
            templates: {
              header: getHeader('Ambiance')
            }
          }),

          instantsearch.widgets.refinementList({
            container: '#level',
            attributeName: 'level',
            limit: 10,
            operator: 'or',
            templates: {
              header: getHeader('Level')
            }
          })

          // instantsearch.widgets.refinementList({
          //   container: '#brand',
          //   attributeName: 'brand',
          //   limit: 10,
          //   operator: 'or',
          //   templates: {
          //     header: getHeader('Brand')
          //   }
          // }),
          //
          // instantsearch.widgets.rangeSlider({
          //   container: '#price',
          //   attributeName: 'price',
          //   templates: {
          //     header: getHeader('Price')
          //   }
          // }),
          //
          // instantsearch.widgets.menu({
          //   container: '#type',
          //   attributeName: 'type',
          //   limit: 10,
          //   templates: {
          //     header: getHeader('Type')
          //   }
          // })
        ];

        widgets.forEach(search.addWidget, search);

        search.start();
      });
    }
  }
});
