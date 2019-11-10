import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category} from './category';
import { User} from './user';
import { map } from 'rxjs/operators';
import { TodoItem } from './todoItem';

@Injectable({
    providedIn: 'root'
  })
export class PrivateTodoService {

    private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }


  loginUser(user: Object): Observable<Object> {
    return this.http.post<User>(this.baseUrl + '/login', user);
  }

  registerUser(user: Object): Observable<Object> {
    return this.http.post<User>(this.baseUrl + '/register', user);
  }

  //category **************

  createCategory(category: Object): Observable<Object> {
    return this.http.post(this.baseUrl +  '/user/createcategory', category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.post(this.baseUrl +  '/user/deletecategory', id);
  }

  listTodoCategoryService(): Observable<any> {
    return this.http.get(this.baseUrl +  '/user/listtodocategories');
  }

  //item ****************

  createItem(todoItem: Object ): Observable<Object> {
    return this.http.post(this.baseUrl +  '/user/createitem', todoItem);
  }

  listTodoItemService(categoryid: number): Observable<any> {
    return this.http.get(this.baseUrl +  '/user/listtodoitems/' + categoryid);
  }



  deleteItem(id: number): Observable<any> {
    return this.http.post(this.baseUrl +  '/user/deleteitem', id);
  }

  updateItem(todoItem: Object ): Observable<Object> {
    return this.http.post(this.baseUrl +  '/user/updateitem', todoItem);
  }


}
