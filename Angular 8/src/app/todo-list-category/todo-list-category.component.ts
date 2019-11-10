import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { PrivateTodoService } from '../private-todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list-category',
  templateUrl: './todo-list-category.component.html',
  styleUrls: ['./todo-list-category.component.css']
})
export class TodoListCategoryComponent implements OnInit {
  report: string | Blob;
  newCategory: Category;
  categories: Observable<Category[]>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private privateTodoService: PrivateTodoService) { }

  ngOnInit() {
    console.log("TodoListCategoryComponent");
    this.newCategory = new Category();
    this.categories = this.privateTodoService.listTodoCategoryService();
  }

  handleInsertCategory() {
    this.privateTodoService.createCategory(this.newCategory).subscribe(data => {
      this.categories = this.privateTodoService.listTodoCategoryService();
    }, error => {
      console.log(error);
    });
  }

  handleDeleteCategory(id : number) {
    this.privateTodoService.deleteCategory(id).subscribe(data => {
      this.categories = this.privateTodoService.listTodoCategoryService();
    }, error => {
      console.log(error);
    });
  }

  displayTodoItems(id : number) {
    this.router.navigate(['/user/todolist/' + id]);
  }

  handleBackup() {
    console.log("test");
    var data = "-- Yapılacaklar --";
    
    this.categories.
    subscribe({
      next(num) { num.forEach(element => {
        
        data = data + " \n\n Görev Kategorisi: "  +  element.name ;
        console.log("kategori:"+ element.id + element.toDoItemList.toString());
        //this.privateTodoService.listTodoItemService(element.id);
      //element.toDoItemList.push();
      for (var key in element.toDoItemList) {
        data = data + " \n Görev: "  +  element.toDoItemList[key].name + " "  + element.toDoItemList[key].description + " " +   element.toDoItemList[key].deadline  + " "
        element.toDoItemList[key].status ;
        
      }
       
        
      }); },
      complete() { console.log('Finished sequence');
      console.log("veri:" + data);
      var blob = new Blob(["\ufeff"+data], { type: 'text/csv;charset=utf-8' })
      fileSaver.saveAs(blob, 'text.txt');
    }
    }
    );

    
  
    //fileSaver.saveAs(this.categories, 'text.txt');
  }

}
