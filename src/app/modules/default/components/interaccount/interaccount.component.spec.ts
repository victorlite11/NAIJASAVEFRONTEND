import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccountComponent } from './interaccount.component';

describe('InteraccountComponent', () => {
  let component: InteraccountComponent;
  let fixture: ComponentFixture<InteraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteraccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
