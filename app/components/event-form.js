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
      this.set('end_at_hour', moment(end_at).hour());
      this.set('end_at_minute', moment(end_at).minute());
    } else {
      this.set('end_at_hour', 22);
      this.set('end_at_minute', 30);
    }
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

  ambiances: ['relaxed', 'party', 'serious'],
  categories: ['party', 'board', 'role-playing', 'card', 'dice', 'miniature', 'strategy', 'cooperative', 'video', 'tile-based'],
  levels: ['beginner', 'intermediate', 'advanced', 'expert'],

  actions: {
    save_event: function(defer) {
      let model = this.get('model');

      //TODO: add auto_accept (and checkbox input) to event form
      model.set('auto_accept', true);

      this.get('targetObject').send('save', this, defer, () => {
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
      });
    }
  },
});
