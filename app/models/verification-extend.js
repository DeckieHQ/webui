import Ember from 'ember';
import Verification from '../models/verification';

let VerificationExtend = Verification.extend({
  token: DS.attr(),
});

VerificationExtend.reopen({
  validations: {
    token: {
      presence: true
    }
  }
});

export default VerificationExtend;
