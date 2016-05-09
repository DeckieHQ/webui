import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('registration')
  this.route('login');
  this.route('search');
  this.route('account', function() {
    this.route('dashboard');
    this.route('personnal-information');
    this.route('change-password');
    this.route('profile');
    this.route('verifications');
    this.route('hosted-events');
  });
  this.route('verification-email')
  this.route('verification-phone-number')
  this.route('events', function() {
    this.route('new');
  });
  this.route('event', { path: '/event/:event_id' }, function() {
    this.route('edit');
  });
  this.route('profile', { path: '/profile/:profile_id' });
});

export default Router;
