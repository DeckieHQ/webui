import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';
import _ from 'lodash/lodash';

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
      presence: {
        unless: 'model.unlimited_capacity'
      },
      numericality: {
        unless: 'model.unlimited_capacity',
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 1000
      }
    },
    "model.min_capacity": {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
      },
      inline: validator(function() {
        let max = Number(this.model.get('model.capacity'));
        let min = Number(this.model.get('model.min_capacity'));
        if (min > max) {
          return this.get('i18n').t("error.min-max");
        }
      })
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
    "model.new_time_slots": {
      inline: validator(function() {
        if (!this.get('alreadyCreated') && this.model.get('model.flexible')) {
          let new_time_slots = this.model.get('model.new_time_slots');

          if (new_time_slots && new_time_slots.length < 2) {
            return this.get('i18n').t("error.empty-time-slots");
          }
        }
      })
    },
    end_at: {
      inline: validator(function() {
        let end_at = this.model.get('model.end_at');
        if(end_at) {
          let begin_at = this.model.get('model.begin_at');
          if (!begin_at) {
            return this.get('i18n').t("error.end-at.no-begin-at");
          }

          begin_at = moment(begin_at);
          let begin_at_hour = this.model.begin_at_hour;
          let begin_at_minute = this.model.begin_at_minute;
          begin_at.hour(begin_at_hour).minute(begin_at_minute);

          let end_at_hour = this.model.end_at_hour;
          let end_at_minute = this.model.end_at_minute;
          end_at = moment(end_at);
          end_at.hour(end_at_hour).minute(end_at_minute);

          if (begin_at > end_at && this.model.get('addEndDate')) {
            return this.get('i18n').t("error.end-at.too-soon");
          }
        }
      })
    },
  },

  time_slots: [
    { date: null, hour: '19', minute: '30', placeholder: 'placeholder.date-option-1' },
    { date: null, hour: '19', minute: '30', placeholder: 'placeholder.date-option-2' },
    { date: null, hour: '19', minute: '30', placeholder: 'placeholder.date-option-3' },
    { date: null, hour: '19', minute: '30', placeholder: 'placeholder.date-option-4' },
    { date: null, hour: '19', minute: '30', placeholder: 'placeholder.date-option-5' }
  ],

  recurrentity: "weekly",
  until: "6",
  recurrentHour: "19",
  recurrentMinute: "00",
  isRecurrent: false,

  recurrentDates: function() {
    if (this.get('day')) {
      let day = parseInt(this.get('day'));
      let refDate = moment();

      let begin_at_hour = this.get('recurrentHour');
      let begin_at_minute = this.get('recurrentMinute');
      refDate.hour(begin_at_hour).minute(begin_at_minute);

      let recurrentity = this.get('recurrentity');
      let until = parseInt(this.get('until'));

      let dates = [];

      if (recurrentity === 'weekly' || recurrentity === 'fortnightly') {
        let firstDate = refDate.clone();
        let firstDateDay = firstDate.day();

        let daysToAdd
          = firstDateDay === day ? 7
          : firstDateDay < day ? day - firstDateDay
          : 7 - (firstDateDay - day);

        firstDate.add(daysToAdd, 'd');

        dates.push(firstDate.toDate());

        let endDate = firstDate.clone().add(until, 'M').add(1, 'w');
        let diffWeeks = recurrentity === 'weekly' ? endDate.diff(firstDate, 'w') : endDate.diff(firstDate, 'w') / 2;

        for (let i = 1; i < diffWeeks; i++) {
          let tmpDate = firstDate.clone();
          let nbWeeks = recurrentity === 'weekly' ? 1 : 2;
          tmpDate.add(nbWeeks*i, 'w');

          dates.push(tmpDate.toDate());
        }
      } else {
        let endDate = refDate.clone().add(until, 'M').add(1, 'M');
        let diffMonths = endDate.diff(refDate, 'M')

        for (let i = 1; i < diffMonths; i++) {
          let tmpDate = refDate.clone();

          if (tmpDate.date() >= 7 || tmpDate.day() > day) {
            tmpDate.add(1*i, 'M').date(1);
          }

          let tmpDateDay = tmpDate.day();

          let daysToAdd
            = tmpDateDay === day ? 0
            : tmpDateDay < day ? day - tmpDateDay
            : 7 - (tmpDateDay - day);

          tmpDate.add(daysToAdd, 'd');

          let nbWeeks
            = recurrentity === 'firstWeek' ? 0
            : recurrentity === 'secondWeek' ? 1
            : recurrentity === 'thirdWeek' ? 2
            : 3

          tmpDate.add(nbWeeks, 'w');

          dates.push(tmpDate.toDate());
        }
      }

      return dates.sort((a, b) => {
        return a < b ? -1 : 1;
      });
    }
  }.property('recurrentity', 'until', 'day'),

  showDate: function() {
    return !this.get('alreadyCreated') || !this.get('model.flexible');
  }.property('model.flexible', 'alreadyCreated'),

  showDateFlexible: function() {
    return !this.get('alreadyCreated') || this.get('model.flexible');
  }.property('model.flexible', 'alreadyCreated'),

  addEndDate: false,

  actions: {
    see_time_slots: function() {
      this.get('targetObject').send('goto_event_time_slots', this.get('model'));
    },

    remove_recurrent_date: function(date) {
      this.get('recurrentDates').removeObject(date);
    },

    toggle_recurrent: function() {
      this.toggleProperty('isRecurrent');
    },

    save_event: function(defer) {
      let model = this.get('model');

      if (this.get('isRecurrent')) {
        model.set('type', 'recurrent');
        model.set('new_time_slots', this.get('recurrentDates'));
      } else if (this.get('model.type') === 'flexible') {
        model.set('begin_at', null);
        model.set('end_at', null);
        model.set('flexible', true);

        let new_time_slots = [];

        this.get('time_slots').forEach((time_slot) => {
          if (time_slot.date) {
            let new_time_slot = moment(time_slot.date);
            new_time_slot.hour(time_slot.hour).minute(time_slot.minute);
            new_time_slots.push(new_time_slot.toDate());
          }
        });

        model.set('new_time_slots', new_time_slots);
      }

      if(this.get('model.unlimited_capacity')) {
        model.set('min_capacity', 0);
        model.set('capacity', null);
        model.set('auto_accept', true);
      }

      this.set('showCustomError', true);

      let params = {
        transitionToModel: this.get('alreadyCreated'),
        beforeSave: () => {
          if(this.get('model.type') === 'normal') {
            model.set('flexible', false);
            model.set('new_time_slots', null);

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
        },
        afterSave: () => {
          this.get('currentUser').get('hosted_events').pushObject(this.get('model'));
          this.get('infos').setHostedEvents();
          if (!this.get('alreadyCreated')) {
            this.get('targetObject').transitionToRoute('event-created', model);
          }
        }
      };
      this.get('targetObject').send('save', this, defer, params);
    }
  },

  ambiances: [
    { value: 'relaxed', label: 'ambiance.relaxed' },
    { value: 'serious', label: 'ambiance.serious' },
    { value: 'teasing', label: 'ambiance.teasing' },
  ],

  categories: [
    { value: 'playful',     label: 'category.playful' },
    // { value: 'board',     label: 'category.board' },
    { value: 'card',      label: 'category.card' },
    { value: 'role-playing', label: 'category.role-playing' },
    // { value: 'dice',      label: 'category.dice' },
    { value: 'deck-building', label: 'category.deck-building' },
    { value: 'miniature', label: 'category.miniature' },
    // { value: 'strategy',  label: 'category.strategy' },
    { value: 'ambiance',     label: 'category.ambiance' },
    { value: 'video',     label: 'category.video' },
    { value: 'outdoor',   label: 'category.outdoor' },
  ],

  levels: [
    { value: 'beginner', label: 'level.beginner' },
    { value: 'intermediate', label: 'level.intermediate' },
    { value: 'advanced', label: 'level.advanced' }
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

  recurrentityOptions: [
    { value: 'weekly', label: 'recurrentity-options.weekly' },
    { value: 'fortnightly', label: 'recurrentity-options.fortnightly' },
    { value: 'firstWeek', label: 'recurrentity-options.firstWeek' },
    { value: 'secondWeek', label: 'recurrentity-options.secondWeek' },
    { value: 'thirdWeek', label: 'recurrentity-options.thirdWeek' },
    { value: 'fourthWeek', label: 'recurrentity-options.fourthWeek' },
  ],

  untilOptions: [
    { value: '1', label: 'until-options.1' },
    { value: '2', label: 'until-options.2' },
    { value: '3', label: 'until-options.3' },
    { value: '6', label: 'until-options.6' },
    { value: '9', label: 'until-options.9' },
    { value: '12', label: 'until-options.12' },
  ],

  daysOptions: [
    { value: '1', label: 'monday' },
    { value: '2', label: 'tuesday' },
    { value: '3', label: 'wednesday' },
    { value: '4', label: 'thursday' },
    { value: '5', label: 'friday' },
    { value: '6', label: 'saturday' },
    { value: '0', label: 'sunday' }
  ],
});
