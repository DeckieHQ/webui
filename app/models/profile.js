import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

let Profile = DS.Model.extend(EmberValidations, {
  nickname: DS.attr(),
  display_name: DS.attr(),
  short_description: DS.attr(),
  description: DS.attr(),
});

export default Profile;
