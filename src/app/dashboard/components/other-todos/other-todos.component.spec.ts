import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTodosComponent } from './other-todos.component';

describe('OtherTodosComponent', () => {
  let component: OtherTodosComponent;
  let fixture: ComponentFixture<OtherTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherTodosComponent]
    });
    fixture = TestBed.createComponent(OtherTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
