import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
  modelNameFromPayloadKey() {
    return 'password-forgottens';
  },

  payloadKeyFromModelName() {
    return 'users';
  },
});
