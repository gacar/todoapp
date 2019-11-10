import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { PrivateTodoService } from '../private-todo.service';
import { Category } from '../category';
import { TodoItem } from '../todoItem';
import { filter } from 'minimatch';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  nameFilter:string;
  order: number;
  category: Category;
  newItem: TodoItem;
  updateItem: TodoItem;
  todoItems: Observable<TodoItem[]>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private privateTodoService: PrivateTodoService) 
    {
      this.category = new Category(this.route.snapshot.params['categoryid']);
      console.log(this.category.id);
     }

  ngOnInit() {
    this.newItem = new TodoItem();
    this.updateItem = new TodoItem();
    this.newItem.category = this.category;
    this.updateItem.category = this.category;
    this.todoItems = this.privateTodoService.listTodoItemService(this.category.id);
  }



  handleInsertItem() {
    this.privateTodoService.createItem(this.newItem).subscribe(data => {
      this.todoItems = this.privateTodoService.listTodoItemService(this.category.id);
    }, error => {
      console.log(error);
    });
  }

  handleDeleteItem(id : number) {
    this.privateTodoService.deleteItem(id).subscribe(data => {
      this.todoItems = this.privateTodoService.listTodoItemService(this.category.id);
    }, error => {
      console.log(error);
    });
  }

  handleCompleteItem(id : number, name: string) {
    this.updateItem.id = id;
    this.updateItem.name = name;
    this.updateItem.status = true;
    this.privateTodoService.updateItem(this.updateItem).subscribe(data => {
      this.todoItems = this.privateTodoService.listTodoItemService(this.category.id);
    }, error => {
      console.log(error);
    });
  }

  handleIncompleteItem(id : number, name: string ) {
    this.updateItem.id = id;
    this.updateItem.name = name;
    this.updateItem.status = false;
    this.privateTodoService.updateItem(this.updateItem).subscribe(data => {
      this.todoItems = this.privateTodoService.listTodoItemService(this.category.id);
    }, error => {
      console.log(error);
    });
  }

  handleFilter(){
    //this.todoItems.Order
    if(this.order==0){
      this.todoItems = this.todoItems.pipe(map(results => results.sort((x,y) => x.id < y.id ? -1 : 1)));
    }
    else if(this.order==1){
      this.todoItems = this.todoItems.pipe(map(results => results.sort((x,y) => new Date(x.deadline).getTime()   < new Date(y.deadline).getTime() ? -1 : 1)));
    }
    else if(this.order==2)
    this.todoItems = this.todoItems.pipe(map(results => results.sort((x,y) => x.name < y.name ? -1 : 1)));
    else if(this.order==3)
    this.todoItems = this.todoItems.pipe(map(results => results.sort((x,y) => x.status < y.status ? -1 : 1)));
     
 
    //this.todoItems = this.todoItems.pipe(map(results => results.filter( x => x.name ===  this.nameFilter)));
    this.todoItems = this.todoItems.pipe(map(results => results.filter( x => x.name.indexOf(this.nameFilter) > -1)));
  }


}
