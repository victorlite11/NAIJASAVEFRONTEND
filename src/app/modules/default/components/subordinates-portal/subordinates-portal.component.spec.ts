import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinatesPortalComponent } from './subordinates-portal.component';

describe('SubordinatesPortalComponent', () => {
  let component: SubordinatesPortalComponent;
  let fixture: ComponentFixture<SubordinatesPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubordinatesPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubordinatesPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
