import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default Ember.Component.extend({
  canDelete: function() {
    return this.get('currentUser').get('profile.id') == this.get('comment.author.id') || this.get('isHost');
  }.property(),
});
