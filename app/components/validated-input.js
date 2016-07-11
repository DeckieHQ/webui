import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),

  init: function() {
    this._super.apply(this, arguments);
    this.set('showError', false);
  },

  translatedPlaceholder: function() {
    if (this.get('placeholder')) {
      return this.get('i18n').t(this.get('placeholder'));
    }
  }.property('placeholder'),

  classNames: ['form-group'],

  attributeBindings: ['data-role'],

  displayErrors: function() {
    let displayErrors = this.get('errors') || [];
    let serverErrors  = this.get('serverErrors') || [];

    serverErrors.forEach(e => displayErrors.push(this.get('i18n').t(e.message)));

    return displayErrors;
  }.property('errors', 'serverErrors'),

  showErrors: function() {
    let hasErrors = this.get('displayErrors').length > 0;
    let showErrors = (this.get('targetObject').get('showErrors') || this.get('showError'));

    return (hasErrors && showErrors);
  }.property('displayErrors', 'showError', 'targetObject.showErrors'),

  actions: {
   showError: function() {
     this.set('showError', true);

     //TODO: 1) when focus on an input and clicking on submit the "focus-out" event is triggered if the input has an error but not the submit event (ember issue?)
     //2) When showError is call by a send action (like in validated-select) the property showError is not triggerred in the .property('showError') of showErrors
     //3) Handle begin_at/end_at errors
   }
 }
});
