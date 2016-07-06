import _ from 'lodash/lodash';
import Ember from 'ember';

import ENV from '../config/environment';

let Search = Ember.Object.extend({
  result: { hits: [] }
});

export default Ember.Route.extend({
  i18n: Ember.inject.service(),

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
          placeholder: this.get('i18n').t('placeholder.search')
        }),
        instantsearch.widgets.hits({
          container: '#hits',
          hitsPerPage: 10,
          templates: { item: this.templateFor('hit'), empty: this.templateFor('no-results') }
        }),
        instantsearch.widgets.stats({
          container: '#stats'
        }),
        instantsearch.widgets.pagination({
          container: '#pagination'
        }),
        instantsearch.widgets.numericRefinementList({
          container: '#full',
          attributeName: 'full',
          options: [
            { name: this.get('i18n').t('label.all') },
            { start: 0, end: 0, name: this.get('i18n').t('label.hide-full') }
          ],
          autoHideContainer: false
        }),
        instantsearch.widgets.numericRefinementList({
          container: '#auto-accept',
          attributeName: 'auto_accept',
          options: [
            { name: this.get('i18n').t('label.all') },
            { start: 1, end: 1, name: this.get('i18n').t('label.auto-accept') },
            { start: 0, end: 0, name: this.get('i18n').t('label.manual') }
          ],
          templates: {
            header: this.labelFor('submission')
          },
          autoHideContainer: false
        }),
        instantsearch.widgets.refinementList({
          container: '#category',
          attributeName: 'category',
          limit: 10,
          operator: 'or',
          templates: {
            header: this.labelFor('category')
          },
          autoHideContainer: false
        }),
        instantsearch.widgets.refinementList({
          container: '#ambiance',
          attributeName: 'ambiance',
          limit: 10,
          operator: 'or',
          templates: {
            header: this.labelFor('ambiance')
          },
          autoHideContainer: false
        }),
        instantsearch.widgets.refinementList({
          container: '#level',
          attributeName: 'level',
          limit: 10,
          operator: 'or',
          templates: {
            header: this.labelFor('level')
          },
          autoHideContainer: false
        })
      ];
      widgets.forEach(search.addWidget, search);

      search.start();

      search.helper.on('result', this.resultsHandler(this));
    });
  },
  resultsHandler: function(context) {
    return function(results) {
      context.modelFor('search').set('result', results);

      ['category', 'ambiance', 'level'].forEach(facet => {
        let inputs = document.querySelector(`#${facet}`).querySelectorAll("input[type='checkbox']");

        for (var i = 0, len = inputs.length; i < len; i++) {
          let label = context.get('i18n').t(`${facet}.${inputs[i].value}`),
             parent = inputs[i].parentElement;

          parent.innerHTML = parent.innerHTML.replace(`>${inputs[i].value}`, `>${label}`);
          i = i++;
        }
      });
    }
  },
  labelFor: function(refinementName) {
    let label = this.get('i18n').t(`label.${refinementName}`);

    return `<label>${label}<label>`;
  },
  templateFor: function(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
  }
});
