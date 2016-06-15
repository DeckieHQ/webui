import Ember from 'ember';
import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  renderTemplate: function() {
    this.render('event/edit', { into: 'application' });
  }
});
