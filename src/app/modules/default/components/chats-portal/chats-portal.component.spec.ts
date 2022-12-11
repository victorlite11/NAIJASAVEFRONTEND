import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsPortalComponent } from './chats-portal.component';

describe('ChatsPortalComponent', () => {
  let component: ChatsPortalComponent;
  let fixture: ComponentFixture<ChatsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
