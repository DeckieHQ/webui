import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  init: function() {
    this._super.apply(this, arguments);

    let model = this.get('model');

    let begin_at = model.get('begin_at');
    let end_at = model.get('end_at');

    this.set('begin_at_hour', moment(begin_at).hour());
    this.set('begin_at_minute', moment(begin_at).minute());

    if (end_at) {
      this.set('end_at_hour', moment(end_at).hour());
      this.set('end_at_minute', moment(end_at).minute());
    } else {
      this.set('end_at_hour', 22);
      this.set('end_at_minute', 30);
    }
  },

  validations: {
    begin_at_hour: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 23
      }
    },
    begin_at_minute: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 59
      }
    },
    end_at_hour: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 23
      }
    },
    end_at_minute: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 59
      }
    }
  },

  ambiances: ['relaxed', 'party', 'serious'],
  categories: ['party', 'board', 'role-playing', 'card', 'dice', 'miniature', 'strategy', 'cooperative', 'video', 'tile-based'],
  levels: ['beginner', 'intermediate', 'advanced', 'expert'],

  actions: {
    create_or_update: function(defer) {
      let model = this.get('model');

      return model.validate()
        .then(() => this.validate())
        .then(() => {
          let begin_at_hour = this.get('begin_at_hour');
          let begin_at_minute = this.get('begin_at_minute');
          let begin_at = moment(model.get('begin_at'));
          begin_at.hour(begin_at_hour).minute(begin_at_minute);
          model.set('begin_at', begin_at.toDate());

          if (model.get('end_at')) {
            let end_at_hour = this.get('end_at_hour');
            let end_at_minute = this.get('end_at_minute');
            let end_at = moment(model.get('end_at'));
            end_at.hour(end_at_hour).minute(end_at_minute);
            model.set('end_at', end_at.toDate());
          }

          return model.save();
        })
        .then(defer.resolve)
        .catch((reason) => {
          this.set('errorMessage', reason.error)
          this.set("showErrors", true);
          defer.reject(reason);
        })
      ;
    }
  },
});
