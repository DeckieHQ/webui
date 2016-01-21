import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

   actions: {
     register: function(defer) {
       let model = this.get('model');

       return model.validate()
         .then(() => model.save().then(() => {
           this.get('session').authenticate('authenticator:devise', model.get('email'), model.get('password'))
            .then(() => defer.resolve());
         }))
         .catch((reason) => {
           this.set('errorMessage', reason.error)
           this.set("showErrors", true);
           defer.reject();
         });
     }
   }
 });
