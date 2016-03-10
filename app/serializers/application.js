import DS from 'ember-data';
import Ember from 'ember';

var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(key, relationship, method) {
    //Default in Ember: return dasherize(key);
     return key;
   }
});
