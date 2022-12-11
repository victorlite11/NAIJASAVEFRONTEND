import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetData } from 'src/app/shared/interface/shared-interface';
import { PasswordService } from 'src/app/shared/services/password/password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  settingPassword = false;

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.min(6)])
  })

  constructor(
    private passwordService : PasswordService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  async submit() {

    // confirm if confirmPassword equals password

    if (this.form.value.password.length < 6) {

      this.feedback = "Password must be at least 6 characters";
      this.type = "error";

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
      return;
   }

    if (this.form.value.password != this.form.value.confirmPassword) {
      this.feedback = "Password and Confirm Password does not match";
      this.type = "error";

      setTimeout(() => {
        this.feedback = ""
      }, 5100)

        return;
    }
    
    this.settingPassword = true;

    let passwordResetData = new PasswordResetData()
    passwordResetData.newPassword = this.form.value.password;
    passwordResetData.requestDate = new Date().toISOString();
    
    let verificationData = JSON.parse(sessionStorage.getItem("password-reset-data") as string)
    passwordResetData.phoneNumber = verificationData.phoneNumber;
    passwordResetData.verificationCode = verificationData.verificationCode;

    await this.passwordService.setNewPassword(passwordResetData).then( response => {
      if(response.success) {
        this.settingPassword = false;
        sessionStorage.removeItem("password-reset-data")
        this.feedback =  response.message as string;
        this.type = "error";
        this.router.navigate(["access"], {relativeTo : this.route.parent})

      } else {
        this.settingPassword = false;
        this.feedback =  response.message as string;
        this.type = "error";

      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    });

  }

  ngOnInit(): void {
  }

}
