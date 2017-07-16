import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitesComponent } from './event-invites.component';

describe('EventInvitesComponent', () => {
  let component: EventInvitesComponent;
  let fixture: ComponentFixture<EventInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
