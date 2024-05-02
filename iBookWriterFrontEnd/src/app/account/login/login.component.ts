import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AccountService} from "../../services/account.services";
import {StorageService} from "../../services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;
  roles: string[] = [];
  isLoginFailed = false;
  errorMessage = '';


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/']);

    }

    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    const { email, password } = this.form.value;

    this.accountService.login(email, password).subscribe(
      {
        next: user => {
          this.storageService.saveUser(user)
          this.accountService.userSubject.next(user)
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/']);
        },
        error: err => {
          this.errorMessage = err.message
          this.isLoginFailed = true
        },
      }
    )

    this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/']));
  }



  reloadPage(): void {
    window.location.reload();
  }
}

