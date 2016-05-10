import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
      let event = this.get('model');

      let container = document.getElementById('map');

      let LatLng = new window.google.maps.LatLng(
        event.get('latitude'),
        event.get('longitude')
      );

      let options = { center: LatLng, zoom: 15 };

      let map = new window.google.maps.Map(container, options);

      new google.maps.Marker({ position: LatLng, map: map});
    });
  },

  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  onlyPrivates: false,

  isPrivate: false,

  isHost: function() {
    return this.get('currentUser').get('profile.id') == this.get('model.host.id');
  }.property(),

  isMember: function() {
    return this.get('isHost') || this.get('confirmed');
  }.property('confirmed'),

  status: function() {
    let user_submission = this.get('user_submission');

    return user_submission ? user_submission.get('status') : "";
  }.property('user_submission'),

  pending: function() {
    return this.get('status') == 'pending';
  }.property('status'),

  confirmed: function() {
    return this.get('status') == 'confirmed';
  }.property('status'),

  actions: {
    join_event: function(defer) {
      let submission = this.store.createRecord('submission', {
        event: this.get('model')
      });

      this.send('save', this, defer, null, () => {
        this.set('user_submission', submission);
        this.get('model').get('attendees').reload();
      }, submission);
    },

    quit_event: function() {
      this.get('user_submission').destroyRecord().then(
        () => this.set('user_submission', null)
      );
    },

    comment: function(defer) {
      let comment = this.store.createRecord('comment', {
        message: this.get('message'),
        private: this.get('isPrivate'),
        author: this.get('currentUser').get('profile'),
        event: this.get('model')
      });

      this.send('save', this, defer, null, null, comment);
    },
  }
 });
