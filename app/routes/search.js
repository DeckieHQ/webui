import Ember from 'ember';

import ENV from '../config/environment';

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<label>' + title + '</label>';
}

export default Ember.Route.extend({
  model: function() {
    var search = instantsearch(ENV.algolia);

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
      });
    }
  }
});
