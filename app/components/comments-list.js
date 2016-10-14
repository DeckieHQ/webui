import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);

    let params = {
      include: 'author',
      sort: '-created_at',
      filters: {
        privates: this.get('isPrivate')
      },
      page: {
        number: 1,
        size:10
      }
    };

    return this.get('event').query('comments', params)
      .then((comments) => this.set('comments', comments));
  },

  count: Ember.computed('comments.meta.pagination.last.number', 'model.meta.pagination.self.number', function() {
    const total = this.get('comments.meta.pagination.last.number') || this.get('comments.meta.pagination.self.number');
    if (!total) {
      return [];
    } else {
      return new Array(total+1).join('x').split('').map((e,i) => i+1);
    }
  }),

  actions: {
    paginate: function(number) {
      let params = {
        include: 'author',
        sort: '-created_at',
        filters: {
          privates: this.get('isPrivate')
        },
        page: {
          number: number,
          size:10
        }
      };

      return this.get('event').query('comments', params)
        .then((comments) =>
          this.set('comments', comments)
        )
      ;
    },
  }
});
