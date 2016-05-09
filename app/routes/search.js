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
      appId: 'HE7TT3H0G2',
      apiKey: '8e22a8ed627215c0adc54d61b6c2d6a5', // search only API key, no ADMIN key
      indexName: 'products',
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
            placeholder: 'Search for products'
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
            attributeName: 'categories',
            limit: 10,
            operator: 'or',
            templates: {
              header: getHeader('Category')
            }
          }),

          instantsearch.widgets.refinementList({
            container: '#brand',
            attributeName: 'brand',
            limit: 10,
            operator: 'or',
            templates: {
              header: getHeader('Brand')
            }
          }),

          instantsearch.widgets.rangeSlider({
            container: '#price',
            attributeName: 'price',
            templates: {
              header: getHeader('Price')
            }
          }),

          instantsearch.widgets.menu({
            container: '#type',
            attributeName: 'type',
            limit: 10,
            templates: {
              header: getHeader('Type')
            }
          })
        ];

        widgets.forEach(search.addWidget, search);

        search.start();

        console.log(search);
      });
    }
  }
});
