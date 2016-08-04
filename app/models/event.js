import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  host: DS.belongsTo('profile'),
  title: DS.attr(),
  category: DS.attr(),
  ambiance: DS.attr(),
  level: DS.attr(),
  capacity: DS.attr(),
  min_capacity: DS.attr('number', { defaultValue: 0 }),
  flexible: DS.attr('boolean', { defaultValue: false }),
  new_time_slots: DS.attr(),
  begin_at: DS.attr('date'),
  end_at: DS.attr('date'),
  opened: DS.attr(),
  ready: DS.attr(),
  description: DS.attr(),
  short_description: DS.attr(),
  attendees_count: DS.attr(),
  submissions_count: DS.attr(),
  private_comments_count: DS.attr(),
  public_comments_count: DS.attr(),
  street: DS.attr(),
  postcode: DS.attr(),
  city: DS.attr(),
  country: DS.attr(),
  latitude: DS.attr(),
  longitude: DS.attr(),
  auto_accept: DS.attr('boolean', { defaultValue: true }),
  comments: DS.hasMany('comment'),
  attendees: DS.hasMany('profile'),
  submissions: DS.hasMany('submission'),
  user_submission: DS.belongsTo('submission'),
  invitations: DS.hasMany('invitation'),
  private: DS.attr('boolean', { defaultValue: false }),
  time_slots: DS.hasMany('time-slot'),
  time_slots_members: DS.hasMany('profile'),

  event_type: Ember.computed('flexible', function() {
    return this.get('flexible') ? 'flexible' : 'normal';
  }),

  shortPostcode: Ember.computed('postcode', function() {
    return this.get('postcode').substring(0, 2);
  }),

  pendingSubmissionsCount: Ember.computed('submissions_count', 'attendees_count', function() {
    return this.get('submissions_count') - this.get('attendees_count');
  }),

  hasPendingSubmissions: Ember.computed('pendingSubmissionsCount', function() {
    return this.get('pendingSubmissionsCount') > 0;
  }),
});
