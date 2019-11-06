import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaListComponent } from './persona-list.component';

describe('PersonasListComponent', () => {
  let component: PersonaListComponent;
  let fixture: ComponentFixture<PersonaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
