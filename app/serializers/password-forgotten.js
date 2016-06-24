import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
  modelNameFromPayloadKey(key) {
    return 'password-forgottens';
  },

  payloadKeyFromModelName(modelName) {
    return 'users';
  },
});
