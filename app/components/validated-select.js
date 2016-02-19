import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default ValidatedInput.extend({
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, 'setValue');
  },

  actions: {
   changeValue: function() {
     this.setValue();
     this.send('showError');
   }
 },

 setValue: function() {
   let selectElement = Ember.$("#"+this.elementId+" .validated-select")[0];
   let selectedIndex = selectElement.selectedIndex;
   let selectedValue = selectElement[selectedIndex].value;

   this.set('value', selectedValue);
 }
});
