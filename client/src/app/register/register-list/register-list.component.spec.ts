import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterListComponent } from './register-list.component';

describe('RegistrosListComponent', () => {
  let component: RegisterListComponent;
  let fixture: ComponentFixture<RegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
