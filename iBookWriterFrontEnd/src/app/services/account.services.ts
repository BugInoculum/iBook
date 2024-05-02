import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from "../../environments/environment.prod";
import {User} from "../models/users";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class AccountService {
  userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }


  login(email: string, password: string): Observable<any> {

    return this.http.post(
      environment.apiUrl + '/api/login',
      {
        email,
        password
      },
      httpOptions
    )
  }


  getCurrentUser():Observable<User | null>{
    return this.user
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/register',
      {
        email,
        password,
      },
      httpOptions
    );
  }



  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }


  getAll(): Observable<User[]> {
    const apiUrl = `${environment.apiUrl}/users/all/`; // Use template literals for URL concatenation
    return this.http.get<User[]>(apiUrl);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      }));
  }


  private addHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers
  }

  // HTTP interceptor to automatically add JWT token to requests
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.addHeaders();
    const modifiedRequest = request.clone({ headers });
    return next.handle(modifiedRequest);
  }

}

