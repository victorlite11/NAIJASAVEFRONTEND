import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDailyDepositComponent } from './change-daily-deposit.component';

describe('ChangeDailyDepositComponent', () => {
  let component: ChangeDailyDepositComponent;
  let fixture: ComponentFixture<ChangeDailyDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDailyDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDailyDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
