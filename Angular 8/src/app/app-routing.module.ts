import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoListCategoryComponent } from './todo-list-category/todo-list-category.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/todocategories', component: TodoListCategoryComponent},
  {path: 'user/todolist/:categoryid', component: TodoListItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
