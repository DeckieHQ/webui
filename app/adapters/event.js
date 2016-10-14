import ApplicationAdapter from '../adapters/application';

export default ApplicationAdapter.extend({
  urlForCreateRecord() {
    return this.get('host')+"/user/hosted_events";
  },
});
