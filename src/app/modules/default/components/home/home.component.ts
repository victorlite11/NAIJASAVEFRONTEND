import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthCredential } from 'src/app/shared/interface/shared-interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  signingin = false;

  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    remember: new FormControl(false)
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  } 

  async submit() {
    this.signingin = true;
    let credentials: IAuthCredential = {
      login: this.form.value.phoneNumber,
      password: this.form.value.password,
      remember: this.form.value.remember ? "true" : "false"
    }

    await this.authService.authenticate(credentials).then( response => {
      if(response.authenticated) {
        this.router.navigate([''],{ replaceUrl: true });
      } else {
        this.feedback = response.reason as string;
        this.type = "error";

        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      }

      this.signingin = false;
    });

  }

  login() {
    this.router.navigate(['../access'], {relativeTo: this.route});
  }

  navigateToLogin() {
    this.router.navigate(['../access'], {relativeTo: this.route});
  }

  navigateToResetPassword() {
    this.router.navigate(['password-reset'], {relativeTo: this.route.parent});
  }

  signup() {
    this.router.navigate(['../access/signup'], {relativeTo: this.route});
  }

}