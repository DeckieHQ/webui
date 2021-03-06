import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('registration');
  this.route('login');
  this.route('login-or-registration');
  this.route('password-forgotten');
  this.route('reset-password');
  this.route('search');
  this.route('account', function() {
    this.route('dashboard');
    this.route('personnal-information');
    this.route('change-password');
    this.route('profile');
    this.route('verifications');
    this.route('hosted-events');
    this.route('attended-events');
    this.route('recurrent-events');
    this.route('notifications');
    this.route('achievements');
  });
  this.route('email-verification');
  this.route('phone-number-verification');
  this.route('events', function() {
    this.route('new');
  });
  this.route('event', { path: '/event/:event_id' }, function() {
    this.route('edit');
  });
  this.route('user-created');
  this.route('event-created', { path: '/event-created/:event_id' });
  this.route('profile', { path: '/profile/:profile_id' });
  this.route('feedbacks', function() {
    this.route('new');
  });
  this.route('notification', { path: '/notification/:notification_id' });
  this.route('feedback-sent');
  this.route('event-not-found');
  this.route('policy');
  this.route('sitemap.xml');
});

export default Router;
