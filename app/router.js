import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('registration')
  this.route('login');
  this.route('dashboard');
  this.route('account', function() {
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
});

export default Router;
