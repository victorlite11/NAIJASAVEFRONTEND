import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalrequestsComponent } from './withdrawalrequests.component';

describe('WithdrawalrequestsComponent', () => {
  let component: WithdrawalrequestsComponent;
  let fixture: ComponentFixture<WithdrawalrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
