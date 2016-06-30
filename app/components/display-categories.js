import Ember from 'ember';

function labelHandler(type) {
  return function() {
    /*
     * This should help this component to receive both ember models and algolia
     * objects.
     */
    let event = this.get('event'),
      code = event.get ? event.get(type) : event[type];

    return this.get('i18n').t(`${type}.${code}`);
  }.property(`event.${type}`);
}

export default Ember.Component.extend({
  i18n: Ember.inject.service(),

  category: labelHandler('category'),

  ambiance: labelHandler('ambiance'),

  level: labelHandler('level'),
});
