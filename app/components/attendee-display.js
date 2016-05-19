import Ember from 'ember';

export default Ember.Component.extend({
  displayContact: false,

  actions: {
    display_contact: function() {
      this.set('displayContact', true);
    }
  }
});
