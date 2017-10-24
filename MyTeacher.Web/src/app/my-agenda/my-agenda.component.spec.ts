import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAgendaComponent } from './my-agenda.component';

describe('MyAgendaComponent', () => {
  let component: MyAgendaComponent;
  let fixture: ComponentFixture<MyAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
