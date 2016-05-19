import DS from 'ember-data';

export default DS.Model.extend({
  nickname: DS.attr(),
  display_name: DS.attr(),
  avatar_url: DS.attr(),
  short_description: DS.attr(),
  description: DS.attr(),
  email_verified: DS.attr(),
  phone_number_verified: DS.attr(),
  created_at: DS.attr(),
});
