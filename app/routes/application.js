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

    save(context, defer, beforeSave = null, afterSave = null, model = context.get('model')) {
      return context.validate()
        .then(() => {
          if (beforeSave) {
            beforeSave();
          }

          return model.save();
        })
        .then(() => {
          if (afterSave) {
            return afterSave();
          }
        })
        .then(defer.resolve)
        .catch((reason) => {
          context.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
});
