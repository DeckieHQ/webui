import DS from 'ember-data';

export default DS.Model.extend({
  poll: function() {
    console.log('toto');
      var _this = this;
      Ember.run.later( function() {
         _this.reload();
         _this.poll();
      }, 500);
   }.observes('didLoad'),

   didLoad: function(){
    console.log('toto');
  }
});
