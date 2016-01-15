import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  showErrors: false,

  actions: {
    register: function() {
      let model = this.get('model');
      let self = this;

      model.validate()
        .then(() => model.save())
        .catch(() => self.set("showErrors", true));
    }
  }
});
