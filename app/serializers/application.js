import DS from 'ember-data';
import Ember from 'ember';

var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {},
      rel = result.data.relationships || {};

    let type = result.data.type.slice(0, -1);

    let json = {};
    json[type] = attr;
    return json;

    // return Object.keys(rel).reduce(function(acc, elem) {
    //   const data = rel[elem].data;
    //   if (data) {
    //     acc[elem + "_id"] = data.id;
    //   }
    //   if (data && data.type) {
    //     acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
    //   }
    //   return acc;
    //
    // }, attr);
 }
});
