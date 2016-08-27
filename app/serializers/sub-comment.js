import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
  modelNameFromPayloadKey() {
    return "sub-comment";
  }
});
