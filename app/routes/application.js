import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  //TODO: gérer le clean des formulaires si pas de submits

  // deactivate: function() {
  //   let model = this.get('controller.model');
  //   model.rollbackAttributes();
  // },

  actions: {
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
