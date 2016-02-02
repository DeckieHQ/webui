import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.set('showAllErrors', false);
    this.set('showError', false);
  },

  showErrors: function() {
    let hasErrors = ((this.get('errors') || []).length > 0);
    let showErrors = (this.get('showAllErrors') || this.get('showError'));

    return (hasErrors && showErrors);
  }.property('errors', 'showAllErrors', 'showError'),

  actions: {
   showError: function() {
     this.set('showError', true);

     //TODO: when focus on an input and clicking on submit the "focus-out" event is triggered if the input has an error but not the submit event (ember issue?)
   }
 }
});
