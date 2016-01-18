import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
   showError: function() {
     this.set("showError", true);
   }
 }
});
