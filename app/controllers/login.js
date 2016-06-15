export default Ember.Controller.extend({
  actions: {
    transition() {
      var previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.store.find('user', '')
          .then(user => {
            this.get('currentUser').set('content', user);
            return user.get('profile');
          })
          .then(() => {
            this.set('previousTransition', null);
            previousTransition.retry();
          })
        ;
      } else {
        this.transitionToRoute('search');
      }
    }
  }
});
