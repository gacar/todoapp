import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCategoryComponent } from './todo-list-category.component';

describe('TodoListCategoryComponent', () => {
  let component: TodoListCategoryComponent;
  let fixture: ComponentFixture<TodoListCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
