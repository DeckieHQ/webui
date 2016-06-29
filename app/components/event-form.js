import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  i18n: Ember.inject.service(),
  infos: Ember.inject.service(),

  init: function() {
    this._super.apply(this, arguments);

    let model = this.get('model');

    let begin_at = model.get('begin_at');
    let end_at = model.get('end_at');

    if (begin_at) {
      this.set('begin_at_hour', moment(begin_at).hour().toString());
      this.set('begin_at_minute', moment(begin_at).minute().toString());

      if (end_at) {
        this.set('addEndDate', true);
        this.set('end_at_hour', moment(end_at).hour().toString());
        this.set('end_at_minute', moment(end_at).minute().toString());
      } else {
        let default_end_at = moment(begin_at).add(4, 'h');
        this.set('model.end_at', default_end_at.toDate());
        this.set('end_at_hour', moment(default_end_at).hour().toString());
        this.set('end_at_minute', moment(default_end_at).minute().toString());
      }
    } else {
      this.set('begin_at_hour', '19');
      this.set('begin_at_minute', '0');
      this.set('end_at_hour', '22');
      this.set('end_at_minute', '30');
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
      presence: true,
      length: {
        maximum: 128,
      },
    },
    "model.capacity": {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 1000
      }
    },
    "model.min_capacity": {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 'model.capacity'
      }
    },
    "model.short_description": {
      length: {
        maximum: 256,
      },
    },
    "model.short_description": {
      length: {
        maximum: 8192,
      },
    },
    "model.street": {
      presence: true
    },
    "model.postcode": {
      presence: true,
      length: { maximum: 10 }
    },
    "model.city": {
      presence: true,
      length: { maximum: 64 }
    },
    "model.country": {
      presence: true,
      length: { maximum: 64 }
    },
    "model.begin_at": {
      presence: true
    },
    end_at: {
      inline: validator(function() {
        let end_at_hour = this.model.end_at_hour;
        let end_at = this.model.get('model.end_at');
        if(end_at_hour && end_at) {
          let begin_at_hour = this.model.begin_at_hour;
          let begin_at_minute = this.model.begin_at_minute;
          let begin_at = moment(this.model.get('model.begin_at'));
          begin_at.hour(begin_at_hour).minute(begin_at_minute);

          let end_at_minute = this.model.end_at_minute;
          end_at = moment(end_at);
          end_at.hour(end_at_hour).minute(end_at_minute);

          if (begin_at > end_at && this.model.get('addEndDate')) {
            return this.get('i18n').t("error.end-at");
          }
        }
      })
    },
  },

  addEndDate: false,

  actions: {
    save_event: function(defer) {
      let model = this.get('model');

      this.set('showCustomError', true);

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
        },
        afterSave: () => {
          this.get('currentUser').get('hosted_events').pushObject(this.get('model'));
          this.get('infos').setHostedEvents();
        }
      };

      this.get('targetObject').send('save', this, defer, params);
    }
  },

  ambiances: [
    { value: 'relaxed', label: 'ambiance.relaxed' },
    { value: 'party', label: 'ambiance.party' },
    { value: 'serious', label: 'ambiance.serious' }
  ],

  categories: [
    { value: 'party', label: 'category.party' },
    { value: 'board', label: 'category.board' },
    { value: 'role-playing', label: 'category.role-playing' },
    { value: 'card', label: 'category.card' },
    { value: 'dice', label: 'category.dice' },
    { value: 'miniature', label: 'category.miniature' },
    { value: 'strategy', label: 'category.strategy' },
  ],

  levels: [
    { value: 'beginner', label: 'level.beginner' },
    { value: 'intermediate', label: 'level.intermediate' },
    { value: 'advanced', label: 'level.advanced' },
    { value: 'expert', label: 'level.expert' },
  ],

  hours: [
    { value: '0', label: 'hour.00h' }, { value: '1', label: 'hour.01h' }, { value: '2', label: 'hour.02h' },
    { value: '3', label: 'hour.03h' }, { value: '4', label: 'hour.04h' }, { value: '5', label: 'hour.05h' },
    { value: '6', label: 'hour.06h' }, { value: '7', label: 'hour.07h' }, { value: '8', label: 'hour.08h' },
    { value: '9', label: 'hour.09h' }, { value: '10', label: 'hour.10h' }, { value: '11', label: 'hour.11h' },
    { value: '12', label: 'hour.12h' }, { value: '13', label: 'hour.13h' }, { value: '14', label: 'hour.14h' },
    { value: '15', label: 'hour.15h' }, { value: '16', label: 'hour.16h' }, { value: '17', label: 'hour.17h' },
    { value: '18', label: 'hour.18h' }, { value: '19', label: 'hour.19h' }, { value: '20', label: 'hour.20h' },
    { value: '21', label: 'hour.21h' }, { value: '22', label: 'hour.22h' }, { value: '23', label: 'hour.23h' },
  ],

  minutes: [
    { value: '0', label: 'minute.00' }, { value: '5', label: 'minute.05' },
    { value: '10', label: 'minute.10' }, { value: '15', label: 'minute.15' },
    { value: '20', label: 'minute.20' }, { value: '25', label: 'minute.25' },
    { value: '30', label: 'minute.30' }, { value: '35', label: 'minute.35' },
    { value: '40', label: 'minute.40' }, { value: '45', label: 'minute.45' },
    { value: '50', label: 'minute.50' }, { value: '55', label: 'minute.55' },
  ],
});
