import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubordinatesPortalComponent } from './add-subordinates-portal.component';

describe('AddSubordinatesPortalComponent', () => {
  let component: AddSubordinatesPortalComponent;
  let fixture: ComponentFixture<AddSubordinatesPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubordinatesPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubordinatesPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
