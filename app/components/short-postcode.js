import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  shortened: function () {
    return this.get('postcode').substring(0, 2);
  }.property('postcode')
});
