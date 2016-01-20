import Ember from 'ember';

export default Ember.Component.extend({
  showErrors: function() {
    let hasErrors = (this.get('errors').length > 0);
    let showErrors = (this.get('showAllErrors') || this.get('showError'));

    return (hasErrors && showErrors);
  }.property('errors', 'showAllErrors', 'showError'),

  actions: {
   showError: function() {
     this.set("showError", true);
   }
 }
});
