import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  event_submit: function(){
    return this.get('preferences.notifications').indexOf('event-submit') > -1;
  }.property(),
  event_unsubmit: function(){
    return this.get('preferences.notifications').indexOf('event-unsubmit') > -1;
  }.property(),
  event_join: function(){
    return this.get('preferences.notifications').indexOf('event-join') > -1;
  }.property(),
  event_leave: function(){
    return this.get('preferences.notifications').indexOf('event-leave') > -1;
  }.property(),
  event_update: function(){
    return this.get('preferences.notifications').indexOf('event-update') > -1;
  }.property(),
  event_cancel: function(){
    return this.get('preferences.notifications').indexOf('event-cancel') > -1;
  }.property(),
  event_comment: function(){
    return this.get('preferences.notifications').indexOf('event-comment') > -1;
  }.property(),
  comment_comment: function(){
    return this.get('preferences.notifications').indexOf('comment-comment') > -1;
  }.property(),
  event_remove_full: function(){
    return this.get('preferences.notifications').indexOf('event-remove_full') > -1;
  }.property(),
  event_remove_start: function(){
    return this.get('preferences.notifications').indexOf('event-remove_start') > -1;
  }.property(),
  event_ready: function(){
    return this.get('preferences.notifications').indexOf('event-ready') > -1;
  }.property(),
  event_not_ready: function(){
    return this.get('preferences.notifications').indexOf('event-not_ready') > -1;
  }.property(),

  actions: {
    update_preferences: function(defer) {
      let prefs = this.get('preferences.notifications');

      if (this.get('event_submit')) {
        if (prefs.indexOf('event-submit') < 0) {
          prefs.push('event-submit');
        }
      } else {
        let index = prefs.indexOf('event-submit');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_unsubmit')) {
        if (prefs.indexOf('event-unsubmit') < 0) {
          prefs.push('event-unsubmit');
        }
      } else {
        let index = prefs.indexOf('event-unsubmit');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_join')) {
        if (prefs.indexOf('event-join') < 0) {
          prefs.push('event-join');
        }
      } else {
        let index = prefs.indexOf('event-join');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_leave')) {
        if (prefs.indexOf('event-leave') < 0) {
          prefs.push('event-leave');
        }
      } else {
        let index = prefs.indexOf('event-leave');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_update')) {
        if (prefs.indexOf('event-update') < 0) {
          prefs.push('event-update');
        }
      } else {
        let index = prefs.indexOf('event-update');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_cancel')) {
        if (prefs.indexOf('event-cancel') < 0) {
          prefs.push('event-cancel');
        }
      } else {
        let index = prefs.indexOf('event-cancel');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_ready')) {
        if (prefs.indexOf('event-ready') < 0) {
          prefs.push('event-ready');
        }
      } else {
        let index = prefs.indexOf('event-ready');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_not_ready')) {
        if (prefs.indexOf('event-not_ready') < 0) {
          prefs.push('event-not_ready');
        }
      } else {
        let index = prefs.indexOf('event-not_ready');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_remove_full')) {
        if (prefs.indexOf('event-remove_full') < 0) {
          prefs.push('event-remove_full');
        }
      } else {
        let index = prefs.indexOf('event-remove_full');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_remove_start')) {
        if (prefs.indexOf('event-remove_start') < 0) {
          prefs.push('event-remove_start');
        }
      } else {
        let index = prefs.indexOf('event-remove_start');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('event_comment')) {
        if (prefs.indexOf('event-comment') < 0) {
          prefs.push('event-comment');
        }
      } else {
        let index = prefs.indexOf('event-comment');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }
      if (this.get('comment_comment')) {
        if (prefs.indexOf('comment-comment') < 0) {
          prefs.push('comment-comment');
        }
      } else {
        let index = prefs.indexOf('comment-comment');
        if (index > -1) {
          prefs.splice(index, 1);
        }
      }

      let params = {
        model: this.get('preferences')
      };

      this.send('save', this, defer, params);
    }
  }
 });
