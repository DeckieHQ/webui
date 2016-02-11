import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default ValidatedInput.extend({
  actions: {
   setValue: function() {
     let selectElement = Ember.$("#"+this.elementId+" .validated-select")[0];
     let selectedIndex = selectElement.selectedIndex;
     let selectedValue = selectElement[selectedIndex].value;

     this.set('value', selectedValue);
     this.send('showError');
   }
 }
});
