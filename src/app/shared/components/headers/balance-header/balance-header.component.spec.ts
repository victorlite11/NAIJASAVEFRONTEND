import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHeaderComponent } from './balance-header.component';

describe('BalanceHeaderComponent', () => {
  let component: BalanceHeaderComponent;
  let fixture: ComponentFixture<BalanceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
