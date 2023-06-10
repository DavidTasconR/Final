import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirarchivosComponent } from './subirarchivos.component';

describe('SubirarchivosComponent', () => {
  let component: SubirarchivosComponent;
  let fixture: ComponentFixture<SubirarchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirarchivosComponent]
    });
    fixture = TestBed.createComponent(SubirarchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
