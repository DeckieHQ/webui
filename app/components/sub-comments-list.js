import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  store: Ember.inject.service(),

  validations: {
    message: {
      length: { maximum: 200 }
    }
  },

  displayedSubCommentsCount: function() {
    let nextPage = this.get('nextPage');

    if (nextPage) {
      return (nextPage - 1) * 10;
    }
  }.property('nextPage'),

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

    display_sub_comments: function() {
      this.set('displaySubComments', true);

      let params = {
        include: 'author',
        sort: '-created_at',
        page: {
          number: 1,
          size:10
        }
      };

      return this.get('comment').query('comments', params)
        .then((subComments) => {
          this.set('nextPage', subComments.get('meta.pagination.next.number'));
          return this.set('subComments', subComments.sortBy('created_at'));
        });
    },

    see_previous_sub_comments: function() {
      let nextPage = this.get('nextPage');

      if (nextPage) {
        let params = {
          include: 'author',
          sort: '-created_at',
          page: {
            number: nextPage,
            size:10
          }
        };

        return this.get('comment').query('comments', params)
          .then((subComments) => {
            this.set('nextPage', subComments.get('meta.pagination.next.number'));
            return this.set('subComments', subComments.sortBy('created_at').pushObjects(this.get('subComments')));
          })
      }
    }
  }
});
