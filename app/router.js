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
  });
});

export default Router;
