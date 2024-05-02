import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Emitters} from "../emitters/emitters";
import {AccountService} from "../services/account.services";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.accountService.user.subscribe(user => {
      if (user) {
        console.log('User:', user);
        // Do something with the user data
      } else {
        console.log('User is null');
      }
    });

    this.storageService.getUser()
  }

}
