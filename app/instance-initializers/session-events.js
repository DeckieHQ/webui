export function initialize(instance) {
  const applicationRoute = instance.container.lookup('route:application');
  const session          = instance.container.lookup('service:session');

  session.on('authenticationSucceeded', function() {
    applicationRoute.send('sessionAuthenticated');
  });

  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('index');
  });
};

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};
