import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientepqrsComponent } from './clientepqrs.component';

describe('ClientepqrsComponent', () => {
  let component: ClientepqrsComponent;
  let fixture: ComponentFixture<ClientepqrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientepqrsComponent]
    });
    fixture = TestBed.createComponent(ClientepqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
