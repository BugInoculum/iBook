import { Component, OnInit } from '@angular/core';
import {Emitters} from "../emitters/emitters";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../services/account.services";
import {environment} from "../../environments/environment.prod";
import {finalize, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(private http: HttpClient,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    this.authenticated = this.accountService.isLoggedIn()
    console.log('Authenticated', this.authenticated);

  }

  logout(): void {
    this.http.post(environment.apiUrl + '/api/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          console.log('output logged out')
          localStorage.removeItem('user')
          window.localStorage.removeItem('user');
          this.router.navigate(['/login']);
          this.authenticated = false;
        }),
        catchError((error) => {
          console.error('Logout error:', error);
          return throwError(error);
        }),
        finalize(() => {
          console.log('output logged out')
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }
}
