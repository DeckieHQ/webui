import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default ValidatedInput.extend({
  actions: {
   setValue: function() {
     let selectedIndex = Ember.$("#"+this.elementId+" .validated-select")[0].selectedIndex;

     if (selectedIndex == 0) {
       this.set('value', null);
       this.send('showError');
     } else {
       let selectedOption = this.get('options')[selectedIndex - 1];
       this.set('value', selectedOption);
     }
   }
 }
});
