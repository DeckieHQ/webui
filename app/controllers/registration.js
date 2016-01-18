import Ember from 'ember';

export default Ember.Controller.extend({
   actions: {
     register: function() {
       let model = this.get('model');
       let self = this;

       model.validate()
         .then(() => model.save())
         .catch(() => {
           self.set("showErrors", true);
         });
     }
   }
 });
