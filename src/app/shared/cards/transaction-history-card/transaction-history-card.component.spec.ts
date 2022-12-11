import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryCardComponent } from './transaction-history-card.component';

describe('TransactionHistoryCardComponent', () => {
  let component: TransactionHistoryCardComponent;
  let fixture: ComponentFixture<TransactionHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
