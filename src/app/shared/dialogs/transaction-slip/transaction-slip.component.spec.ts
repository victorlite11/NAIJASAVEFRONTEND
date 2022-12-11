import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSlipComponent } from './transaction-slip.component';

describe('TransactionSlipComponent', () => {
  let component: TransactionSlipComponent;
  let fixture: ComponentFixture<TransactionSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
