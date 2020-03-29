import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoListComponent } from './ingreso-list.component';

describe('IngresosListComponent', () => {
  let component: IngresoListComponent;
  let fixture: ComponentFixture<IngresoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
