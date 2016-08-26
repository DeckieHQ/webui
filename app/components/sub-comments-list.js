import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  store: Ember.inject.service(),

  init: function() {
    this._super.apply(this, arguments);

    let params = {
      include: 'author',
      sort: 'created_at',
      page: {
        number: 1,
        size:10
      }
    };

    return this.get('comment').query('comments', params)
      .then((subComments) => this.set('subComments', subComments))
  },

  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  actions: {
    comment: function(defer) {
      let subComment = this.get('store').createRecord('sub-comment', {
        message: this.get('message'),
        author: this.get('currentUser').get('profile'),
        comment: this.get('comment')
      });

      let params = {
        afterSave: () => {
          this.set('message', null);
        },
        model: subComment
      }

      this.get('targetObject').get('targetObject').get('targetObject').send('save', this, defer, params);
    },
  }
});
