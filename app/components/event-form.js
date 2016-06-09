import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  init: function() {
    this._super.apply(this, arguments);

    let model = this.get('model');

    let begin_at = model.get('begin_at');
    let end_at = model.get('end_at');

    if (begin_at) {
      this.set('begin_at_hour', moment(begin_at).hour());
      this.set('begin_at_minute', moment(begin_at).minute());
    } else {
      this.set('begin_at_hour', 19);
      this.set('begin_at_minute', 0);
    }

    if (end_at) {
      this.set('addEndDate', true);
      this.set('end_at_hour', moment(end_at).hour());
      this.set('end_at_minute', moment(end_at).minute());
    } else {
      this.set('end_at_hour', 22);
      this.set('end_at_minute', 30);

    }
    Ember.run.scheduleOnce('afterRender', this, function () {
      let placesAutocomplete = places({
        container: document.getElementsByName('street')[0],
        type: 'address',
        templates: {
          value: function(suggestion) {
            return suggestion.name;
          }
        }
      });
      placesAutocomplete.on('change', this._addressHandler(this));
    });
  },
  _addressHandler: function(context) {
    return function(e) {
      let model = context.get('model');

      model.set('city',     e.suggestion.city);
      model.set('postcode', e.suggestion.postcode);
      model.set('country',  e.suggestion.country);
    };
  },

  validations: {
    "model.title": {
      presence: true
    },
    "model.capacity": {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 1000
      }
    },
    "model.street": {
      presence: true
    },
    "model.postcode": {
      presence: true
    },
    "model.city": {
      presence: true
    },
    "model.country": {
      presence: true
    },
    "model.begin_at": {
      presence: true
    },
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

  addEndDate: false,

  ambiances: ['relaxed', 'party', 'serious'],
  categories: ['party', 'board', 'role-playing', 'card', 'dice', 'miniature', 'strategy', 'cooperative', 'video', 'tile-based'],
  levels: ['beginner', 'intermediate', 'advanced', 'expert'],

  actions: {
    save_event: function(defer) {
      let model = this.get('model');

      let params = {
        transitionToModel: true,
        beforeSave: () => {
          let begin_at_hour = this.get('begin_at_hour');
          let begin_at_minute = this.get('begin_at_minute');
          let begin_at = moment(model.get('begin_at'));
          begin_at.hour(begin_at_hour).minute(begin_at_minute);
          model.set('begin_at', begin_at.toDate());

          if (this.get('addEndDate')) {
            let end_at_hour = this.get('end_at_hour');
            let end_at_minute = this.get('end_at_minute');
            let end_at = moment(model.get('end_at'));
            end_at.hour(end_at_hour).minute(end_at_minute);
            model.set('end_at', end_at.toDate());
          } else {
            model.set('end_at', null);
          }
        }
      };

      this.get('targetObject').send('save', this, defer, params);
    }
  },
});
