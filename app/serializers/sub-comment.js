import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
  modelNameFromPayloadKey(key) {
    return "sub-comment";
  },
});
