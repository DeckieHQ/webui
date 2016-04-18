import Ember from 'ember';
import ValidatedInput from '../components/validated-input';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);

    let params = {
      include: 'author',
      filters: {
        privates: this.get('isPrivate')
      }
    };

    return this.get('event').query('comments', params)
      .then((comments) =>
        this.set('comments', comments)
      )
    ;
  },
});
