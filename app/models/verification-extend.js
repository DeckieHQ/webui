import Ember from 'ember';
import Verification from '../models/verification';

let VerificationExtend = Verification.extend({
  token: DS.attr(),
});

export default VerificationExtend;
