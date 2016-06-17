import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  plusOne: function () {
    return this.get('count') + 1;
  }.property()
});
