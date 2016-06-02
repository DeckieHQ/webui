import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  //TODO: gérer le clean des formulaires si pas de submits

  // deactivate: function() {
  //   let model = this.get('controller.model');
  //   model.rollbackAttributes();
  // },

  session: Ember.inject.service('session'),

  beforeModel(transition) {
    if (this.get('session').get('isAuthenticated')) {
      return this._populateCurrentUser();
    }
  },

  _populateCurrentUser() {
    return this.store.find('user', '')
      .then(user => {
        this.get('currentUser').set('content', user);
        user.get('profile');
      }
    );
  },

  actions: {
    sessionAuthenticated() {
      this._populateCurrentUser().then(user => this.transitionTo('search'));
    },

    transition_to(record) {
      this.transitionTo(record.get('constructor.modelName'), record);
    },

    save(context, defer, params = {}) {
      let self = this;
      let model = params.model || context.get('model');

      return context.validate()
        .then(() => {
          if (params.beforeSave) {
            params.beforeSave();
          }
          return model.save();
        })
        .then(() => {
          if (params.afterSave) {
            return params.afterSave();
          }
        })
        .then(defer.resolve)
        .then(() => {
          if (params.transitionToModel) {
            self.transitionTo(model.constructor.modelName, model)
          }
        })
        .catch((reason) => {
          console.log(reason);
          context.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
});
