import { TestBed } from '@angular/core/testing';

import { HasResetPasswordVerificationCodeGuard } from './has-reset-password-verification-code.guard';

describe('HasResetPasswordVerificationCodeGuard', () => {
  let guard: HasResetPasswordVerificationCodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasResetPasswordVerificationCodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
