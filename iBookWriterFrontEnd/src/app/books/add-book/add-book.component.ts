import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/books.services";
import {Book} from "../../models/books";
import {AccountService} from "../../services/account.services";
import {JSONContent} from "@tiptap/core";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit{

  author!: string | undefined
  editorContent: JSONContent = {}

  book: Book = {
    title: '',
    content: '',
    published: false
  };
  submitted = false;

  constructor(private booksService: BookService, private accountsService: AccountService)
  {console.log('here? add') }


  ngOnInit(){
    const user = this.accountsService.userValue
    this.author = user?.email?.toString()
    console.log('add component called', this.author)
  }


  saveBook(): void {
    const data = {
      title: this.book.title,
      content:  JSON.stringify(this.editorContent)
    };

    this.booksService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log('res is from books create', data);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      content: '',
      published: false
    };
  }

  saveEditorContent(event: JSONContent){
    this.editorContent = event
    console.log('content saved is: ', JSON.stringify(this.editorContent));
    this.saveBook()
  }

}
