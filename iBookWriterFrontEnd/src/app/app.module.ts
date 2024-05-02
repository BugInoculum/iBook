import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from "./account/register/register/register.component";
import {LoginComponent} from "./account/login/login.component";
import {HomeComponent} from './home/home.component';
import {NavComponent} from './nav/nav.component';
import {BookDetailsComponent} from "./books/book-details/book-details.component";
import {BookListComponent} from "./books/book-list/book-list.component";
import {AddBookComponent} from "./books/add-book/add-book.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxTiptapModule} from "ngx-tiptap";
import {TipTapEditorComponent} from "./tiptap-editor/tiptap-editor.component";
import {MatButtonModule} from "@angular/material/button";
import { ShareComponent } from './books/share/share.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    BookListComponent,
    BookDetailsComponent,
    AddBookComponent,
    TipTapEditorComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTiptapModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
