import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontributorComponent } from './addcontributor.component';

describe('AddcontributorComponent', () => {
  let component: AddcontributorComponent;
  let fixture: ComponentFixture<AddcontributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
