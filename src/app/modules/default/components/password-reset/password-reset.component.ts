import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from 'src/app/shared/services/password/password.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";
  resendCountdown = 60;
  resendMessage = `Resend verification code after ${this.resendCountdown}`
  title = "NaijaSave";
  count = "Reset your password";
  verificationCodeRequested = false;

  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required])
  })

  verificationForm: FormGroup = new FormGroup({
    verificationCode : new FormControl('', [Validators.required])
  })

  verifying = false;
  constructor(
    private passwordService: PasswordService,
    private location : Location,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  async submit() {
    this.verifying = true;

    await this.passwordService.getVerificationCode(this.form.value.phoneNumber).then( response => {
      if(response.success) {
        this.verifying = false;
        this.beginCountDown();
        this.verificationCodeRequested = true;
      } else {
        this.verifying = false;
        this.feedback = response.message;
        this.type = "error";
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      }
    });

  }

  resendVerificationCode() {
    this.submit();
  }

  async proceed() {
    this.verifying = true;

    await this.passwordService.checkVerificationCode(this.form.value.phoneNumber, this.verificationForm.value.verificationCode).then(r => {
      if(r.success) {
        this.verifying = false;
        let payload = {
          phoneNumber : this.form.value.phoneNumber,
          verificationCode : this.verificationForm.value.verificationCode
        }
        sessionStorage.setItem("password-reset-data", JSON.stringify(payload));
        this.router.navigate(['set-new-password'],{ relativeTo : this.route.parent });
      } else {
        this.feedback = r.message;
        this.type = "error";
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
        this.verifying = false;
      }
    })
    
  }

  moveBack() {
    this.location.back();
  }

  private beginCountDown() {
    if(this.resendCountdown == 0) {
      this.resetCountDown();
    }

    let timerId = setInterval(() => {
      if(this.resendCountdown > 0) {
        this.resendCountdown--;
        this.resendMessage = `Resend verification code after ${this.resendCountdown}`;
      } else {
        clearInterval(timerId)
      }
    },  1000);
  }

  private resetCountDown() {
    this.resendCountdown = 60
  }

  ngOnInit(): void {
  }

}
