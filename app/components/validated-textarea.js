import ValidatedInput from '../components/validated-input';

export default ValidatedInput.extend({
  characters_left: function() {
    return this.get('maxlength') - (this.get('value') || "").length;
  }.property('value'),
});
