import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let Verification = DS.Model.extend(EmberValidations, {
  type: DS.attr(),
});

export default Verification;
