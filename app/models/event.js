import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let Event = DS.Model.extend(EmberValidations, {
  title: DS.attr(),
  category: DS.attr(),
  ambiance: DS.attr(),
  level: DS.attr(),
  capacity: DS.attr(),
  begin_at: DS.attr('date'),
  end_at: DS.attr('date'),
  street: DS.attr(),
  postcode: DS.attr(),
  city: DS.attr(),
  country: DS.attr(),
});

Event.reopen({
  validations: {
    title: {
      presence: true
    },
    capacity: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 1000
      }
    },
    street: {
      presence: true
    },
    postcode: {
      presence: true
    },
    city: {
      presence: true
    },
    country: {
      presence: true
    },
    begin_at: {
      presence: true
    },
  }
});

export default Event;
