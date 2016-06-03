import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transition: function() {
      let record = this.get('transitonToRecord');
      if (record) {
        return this.transitionToRoute(record.get('constructor.modelName'), record, {queryParams: {applyAction: this.get('applyAction')}});
      } else {
        this.transitionToRoute('search')
      }
    }
  }
});
