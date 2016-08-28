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
    } else {
      return 0;
    }
  }.property('nextPage'),

  actions: {
    comment: function(defer) {
      let subComment = this.get('store').createRecord('sub-comment', {
        message: this.get('message'),
        author: this.get('currentUser').get('profile'),
        comment: this.get('comment')
      });

      let subComments = this.get('subComments');
      let count = this.get('displayedSubCommentsCount');
      let total = this.get('comment.comments_count');

      let params = {
        afterSave: () => {
          this.set('message', null);
          this.set('displayedSubCommentsCount', count+1)
          this.set('comment.comments_count', total+1);
          this.set('subComments', subComments.pushObjects([subComment]));
        },
        model: subComment
      }

      this.get('targetObject').get('targetObject').get('targetObject').send('save', this, defer, params);
    },

    delete_comment: function(comment) {
      this.get('subComments').removeObject(comment);
      let count = this.get('displayedSubCommentsCount');
      let total = this.get('comment.comments_count');
      this.set('displayedSubCommentsCount', count-1)
      this.set('comment.comments_count', total-1);
      comment.destroyRecord();
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
