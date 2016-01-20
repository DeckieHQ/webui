import Ember from 'ember';

export default Ember.Controller.extend({
   actions: {
     register: function(defer) {
       let model = this.get('model');

       return model.validate()
         .then(() => model.save().then(() => defer.resolve()))
         .catch((reason) => {
           this.set('errorMessage', reason.error)
           this.set("showErrors", true);
           defer.reject();
         });
     }
   }
 });
