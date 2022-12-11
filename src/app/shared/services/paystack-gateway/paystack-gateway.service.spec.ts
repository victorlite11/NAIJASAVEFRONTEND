import { TestBed } from '@angular/core/testing';

import { PaystackGatewayService } from './paystack-gateway.service';

describe('PaystackGatewayService', () => {
  let service: PaystackGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaystackGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
