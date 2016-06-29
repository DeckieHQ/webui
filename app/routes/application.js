import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  moment: Ember.inject.service(),
  i18n: Ember.inject.service(),

  beforeModel(transition) {
    this._switchLocale('fr');

    if (this.get('session').get('isAuthenticated')) {
      return this._populateCurrentUser();
    }
  },

  _populateCurrentUser() {
    return this.store.find('user', '')
      .then(user => {
        this.get('currentUser').set('content', user);
        return user.get('profile');
      }
    );
  },

  _switchLocale(locale) {
    this.get('moment').changeLocale(locale);
    this.set('i18n.locale', locale);
    // Stopgap to fix an issue with ember-validations and i18n 4.X
    Ember.I18n = this.get('i18n');
  },

  actions: {
    sessionAuthenticated() {
      this._populateCurrentUser();
    },

    sessionInvalidated() {
      this.get('currentUser').set('content', null);
      this.transitionTo('index');
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
          if (params.transitionToRecord) {
            self.transitionTo(params.transitionToRecord.constructor.modelName, params.transitionToRecord)
          } else if (params.transitionToModel) {
            self.transitionTo(model.constructor.modelName, model)
          }
        })
        .catch((reason) => {
          if (params.fail) {
            params.fail();
          }
          console.log(reason);
          context.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  }
});
