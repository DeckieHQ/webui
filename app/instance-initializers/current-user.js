import Ember from 'ember';

export function initialize({ registry }) {
  const service = Ember.ObjectProxy.create({ isServiceFactory: true });

  registry.register('service:current-user', service, { instantiate: false, singleton: true });

  registry.injection('route',      'currentUser', 'service:current-user');
  registry.injection('controller', 'currentUser', 'service:current-user');
  registry.injection('component',  'currentUser', 'service:current-user');
}

export default {
  initialize,
  name: 'current-user'
};
