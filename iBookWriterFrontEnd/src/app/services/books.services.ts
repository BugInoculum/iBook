import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book} from "../models/books";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiUrl + '/books/all');
  }

  get(id: any): Observable<Book> {
    return this.http.get<Book>(environment.apiUrl + '/books/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/books/create/', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/books/update/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(environment.apiUrl + '/books/delete/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(environment.apiUrl + '/books/delete/all/');
  }

  // findByTitle(title: any): Observable<Book[]> {
  //   return this.http.get<Book[]>(`${baseUrl}?title=${title}`);
  // }
  //
  // findByAuthor(author: any): Observable<Book[]> {
  //   return this.http.get<Book[]>(`${baseUrl}?author=${author}`);
  // }
}
