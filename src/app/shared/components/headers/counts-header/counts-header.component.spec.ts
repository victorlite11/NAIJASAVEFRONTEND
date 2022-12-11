import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsHeaderComponent } from './counts-header.component';

describe('CountsHeaderComponent', () => {
  let component: CountsHeaderComponent;
  let fixture: ComponentFixture<CountsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
