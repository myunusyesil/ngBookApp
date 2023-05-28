import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authservice: AuthService) {}

  isLogin = false;
  errorMsg = null;
  isLoading = false;

  ngOnInit(): void {}

  onSubmit(registerForm: NgForm) {
    if (!registerForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;
    let email = registerForm.value.username;
    let password = registerForm.value.password;

    this.isLoading = true;
    if (this.isLogin) {
      authObs = this.authservice.login(email, password);
    } else {
      authObs = this.authservice.signUp(email, password);
    }

    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
      },
      (errorMsg) => {
        this.errorMsg = errorMsg;
        this.isLoading = false;
      }
    );
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
