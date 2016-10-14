import DS from 'ember-data';
import Verification from '../models/verification';

export default Verification.extend({
  token: DS.attr(),
});
