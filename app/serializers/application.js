import DS from 'ember-data';
import Ember from 'ember';

var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(key) {
    //Default in Ember: return dasherize(key);
     return key;
   },

  normalizeArrayResponse(store, primaryModelClass, payload) {
    const result = this._super(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  },

  createPageMeta(data) {
    let meta = {};

    Object.keys(data).forEach(type => {
      const link = data[type];
      meta[type] = {};
      let a = document.createElement('a');
      a.href = link;

      a.search.slice(1).split('&').forEach(pairs => {
        const [param, value] = pairs.split('=');

        if (param === 'page%5Bnumber%5D') {
          meta[type].number = parseInt(value);
        }
        if (param === 'page%5Bsize%5D') {
          meta[type].size = parseInt(value);
        }

      });
      a = null;
    });

    return meta;
  }
});
