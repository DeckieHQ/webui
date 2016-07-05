import DS from 'ember-data';

export default DS.Model.extend({
  nickname: DS.attr(),
  display_name: DS.attr(),
  avatar_url: DS.attr(),
  avatar: DS.attr(),
  short_description: DS.attr(),
  description: DS.attr(),
  email_verified: DS.attr(),
  moderator: DS.attr(),
  phone_number_verified: DS.attr(),
  created_at: DS.attr(),
  contact: DS.belongsTo('contact'),
  achievements: DS.hasMany('achievement'),

  display_tag: Ember.computed('display_name', 'moderator', function() {
    let displayName = this.get('display_name');

    return this.get('moderator') ? `[M] ${displayName}` : displayName;
  })
});
