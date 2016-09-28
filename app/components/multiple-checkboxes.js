import Ember from 'ember';

var MultiSelectCheckbox = Ember.Object.extend({
  label: 'label',
  value: 'value',
  isChecked: false,

  changeValue: function () { },

  onIsCheckedChanged: Ember.observer('isChecked', function () {
    var fn = (this.get('isChecked') === true) ? 'pushObject' : 'removeObject';
    this.get('changeValue').call(this, fn, this.get('value'));
  })
});

export default Ember.Component.extend({
  labelProperty: 'label',
  valueProperty: 'value',
  options: [],
  selected: [],

  checkboxes: Ember.computed('options', function () {
    var _this = this;
    var labelProperty = this.get('labelProperty');
    var valueProperty = this.get('valueProperty');
    var selected = this.get('selected');
    return this.get('options').map(function (opt) {
      var label = opt[labelProperty];
      var value = opt[valueProperty];
      var isChecked = selected.contains(value);
      return MultiSelectCheckbox.create({
        label: label,
        value: value,
        isChecked: isChecked,
        changeValue: function (fn, value) {
          _this.get('selected')[fn](value);
        }
      });
    });
  })
});
