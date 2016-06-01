import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
      let event = this.get('model');

      //TODO: sometimes map doesn't show when event is already loaded / add google api key

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

  displayPrivateComments: function() {
    return this.get('isMember') && (this.get('model.private_comments_count') > 0)
  }.property('isMember'),

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

  pendingSubmissions: function() {
    return this.get('submissions').filter((s) => s.get('status') == 'pending');
  }.property('submissions'),

  full: Ember.computed('model.attendees.length', function() {
    return this.get('model.attendees.length') >= this.get('model.capacity');
  }),

  actions: {
    join_event: function(defer) {
      let submission = this.store.createRecord('submission', {
        event: this.get('model')
      });

      let params = {
        afterSave: () => {
          this.set('user_submission', submission);
          this.get('model').get('attendees').reload();
        },
        model: submission
      };

      this.send('save', this, defer, params);
    },

    quit_event: function() {
      this.get('user_submission').destroyRecord().then(
        () => this.set('user_submission', null)
      );
    },

    accept_submission: function(submission) {
      submission.save().then(() => {
        submission.set('status', 'confirmed');
        this.notifyPropertyChange('submissions');
        this.get('model').get('attendees').reload();
      });
    },

    comment: function(defer) {
      let comment = this.store.createRecord('comment', {
        message: this.get('message'),
        private: this.get('isPrivate'),
        author: this.get('currentUser').get('profile'),
        event: this.get('model')
      });

      this.send('save', this, defer, { model: comment });
    },
  }
 });
