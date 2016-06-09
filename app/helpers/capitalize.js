import Ember from 'ember';

export function capitalize(object) {
  return object[0].toLowerCase().capitalize();
}

export default Ember.Helper.helper(capitalize);
