import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  isChecked: function () {
    let isChecked = false;

    let timeSlotId = this.get('time_slot.id');

    this.get('member.time_slot_submissions').forEach((time_slot_submission) => {
      if (time_slot_submission.get('time_slot.id') == timeSlotId) {
        isChecked = true;
      }
    })

    return isChecked;
  }.property('member.time_slot_submissions', 'time_slot'),

  disabled: function () {
    return this.get('currentUser.profile.id') != this.get('member.id');
  }.property('currentUser', 'member'),

  actions: {
    join_time_slot: function () {
      let time_slot = this.get('time_slot');

      if (time_slot.get('member')) {
        this.get('member.time_slot_submissions').forEach((time_slot_submission) => {
          if (time_slot_submission.get('time_slot.id') == time_slot.id) {
            return time_slot_submission.destroyRecord();
          }
        })
      } else {
        let submission = this.get('store').createRecord('time-slot-submission', {
          time_slot: time_slot
        });

        return submission.save();
      }
    }
  }
});
