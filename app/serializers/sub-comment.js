import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
  modelNameFromPayloadKey(key) {
    if (key == 'comments') {
      return "sub-comment";
    } else {
      return this._super(...arguments);
    }
  }
});
