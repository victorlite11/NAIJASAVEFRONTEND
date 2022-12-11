import { TestBed } from '@angular/core/testing';

import { MakeOnlinePaymentService } from './make-online-payment.service';

describe('MakeOnlinePaymentService', () => {
  let service: MakeOnlinePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeOnlinePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
