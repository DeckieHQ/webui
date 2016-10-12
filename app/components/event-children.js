import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),

  init: function() {
    this._super.apply(this, arguments);

    let params = {
      sort: 'begin_at',
      page: {
        number: 1,
        size:50
      }
    };

    return this.get('event').query('children', params)
      .then((children) => this.set('children', children))
  },

  actions: {
    remove_recurrent_date: function(child) {
      if (confirm(this.get('i18n').t('event.confirm-delete'))) {
        child.destroyRecord();
      }
    },
  }
});
