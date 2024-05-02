import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../services/account.services";


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private accountsService: AccountService,
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form.value; // Access values using form.value

    if (email && password) {
      console.log("email", email, 'password', password)
      this.accountsService.register(email, password).subscribe({
        next: data => {
          console.log('response data is', data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);

        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
    else {
      console.log(this.form)
      this.isSignUpFailed = true;
    }

  }
}
