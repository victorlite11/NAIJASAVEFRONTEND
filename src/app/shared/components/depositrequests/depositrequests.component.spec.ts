import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositrequestsComponent } from './depositrequests.component';

describe('DepositrequestsComponent', () => {
  let component: DepositrequestsComponent;
  let fixture: ComponentFixture<DepositrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
