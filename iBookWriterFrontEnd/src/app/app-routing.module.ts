// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import {AuthGuard} from "./helpers/auth.guard";
// import {HomeComponent} from "./home/home.component";
//
//
// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
//
// const routes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
//   { path: 'account', loadChildren: accountModule },
//
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./account/login/login.component";
import {RegisterComponent} from "./account/register/register/register.component";
import {BookListComponent} from "./books/book-list/book-list.component";
import {BookDetailsComponent} from "./books/book-details/book-details.component";
import {AddBookComponent} from "./books/add-book/add-book.component";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'books/add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BookListComponent,  canActivate: [AuthGuard]},
  { path: 'books/:id', component: BookDetailsComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
