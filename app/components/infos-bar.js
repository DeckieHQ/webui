import Ember from 'ember';

export default Ember.Component.extend({
  infos: Ember.inject.service(),
  session: Ember.inject.service(),
});
