import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transition: function() {
      let record = this.get('transitonToRecord');
      if (record) {
        this.container.lookup('controller:event').send('join_event');
        return this.transitionToRoute(record.get('constructor.modelName'), record);
      } else {
        this.transitionToRoute('search');
      }
    }
  }
});
