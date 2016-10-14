export default Ember.Controller.extend({
  actions: {
    goto_event(id) {
      return this.transitionToRoute('event', id);
    }
  }
});
